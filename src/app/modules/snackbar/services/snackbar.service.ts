import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Inject, Optional } from '@angular/core';
import { SnackbarComponent } from '../component/snackbar.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';


@Injectable()
export class SnackbarService {

  public snackbarComponentRef!: ComponentRef<SnackbarComponent>;

  public constructor(
    @Inject(SNACKBAR_CONFIG) private readonly config: SnackbarConfig,
    private readonly factoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        const queryParams = this.router.parseUrl(event.urlAfterRedirects);
        if (!isNullOrUndefined(queryParams.queryParams.snackbar)) {
          this.open(queryParams.queryParams.snackbar);
        }
      });
  }

  public open(message: string): void {
    if (isNullOrUndefined(message) || message === '') {
      return;
    }

    this.addQueryParamToUrl(message);
    this.addElementToDOM(message);

    setTimeout(() => this.close(), this.config.timeout);
  }

  public close(): void {
    this.appRef.detachView(this.snackbarComponentRef.hostView);
    this.snackbarComponentRef.destroy();
  }

  private addElementToDOM(message: string): void {
    const factory = this.factoryResolver.resolveComponentFactory(SnackbarComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbarComponentRef = componentRef;
  }

  private addQueryParamToUrl(message: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        snackbar: message,
      },
      queryParamsHandling: 'merge',
    });
  }
}
