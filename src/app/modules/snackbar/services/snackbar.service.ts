import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Inject } from '@angular/core';
import { SnackbarComponent } from '../component/snackbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';


@Injectable()
export class SnackbarService {

  private _componentRef!: ComponentRef<SnackbarComponent>;

  public constructor(
    @Inject(SNACKBAR_CONFIG) private readonly config: SnackbarConfig,
    private readonly factoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly router: Router,
  ) { }

  public init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        const queryParams = this.router.parseUrl(event.urlAfterRedirects);

        if (isNullOrUndefined(queryParams.queryParams.snackbar)) {
          return;
        }

        this.open(queryParams.queryParams.snackbar);
      });
  }

  public open(message: string, afterClosing?: () => void, afterOpening?: () => void): ComponentRef<SnackbarComponent> {
    if (!isNullOrUndefined(this._componentRef)) {
      this.close();
    }

    if (isNullOrUndefined(message) || message === '') {
      return;
    }

    this._componentRef = this.createComponentRef();
    this._componentRef.instance.message = message;

    let snackbarTimeout$: any = null;

    const afterOpeningEvent$ = this._componentRef.instance.afterOpening.subscribe(() => {
      snackbarTimeout$ = setTimeout(() => {
        this._componentRef.instance.close();
      }, this.config.timeout);

      if (!isNullOrUndefined(afterOpening)) {
        afterOpening();
      }
    });

    const afterClosingEvent$ = this._componentRef.instance.afterClosing.subscribe(() => {
      this.close();

      if (!isNullOrUndefined(afterClosing)) {
        afterClosing();
      }
    });

    this._componentRef.onDestroy(() => {
      afterOpeningEvent$.unsubscribe();
      afterClosingEvent$.unsubscribe();
      clearTimeout(snackbarTimeout$);
    });

    this.addElementToDOM(this._componentRef);

    return this._componentRef;
  }

  public close(): void {
    this.appRef.detachView(this._componentRef.hostView);
    this._componentRef.destroy();
  }

  private createComponentRef(): ComponentRef<SnackbarComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(SnackbarComponent);
    const componentRef = factory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);
    componentRef.hostView.detectChanges();

    return componentRef;
  }

  private addElementToDOM(componentRef: ComponentRef<SnackbarComponent>): void {
    const { nativeElement } = componentRef.location;
    document.body.appendChild(nativeElement);
  }
}
