import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef, Inject } from '@angular/core';
import { SnackbarComponent } from '../component/snackbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';
import { SnackbarType } from '../enums/snackbar-type.enum';


@Injectable()
export class SnackbarService {

  private _componentRefs: ComponentRef<SnackbarComponent>[] = [];

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

  public open(message: string, type: SnackbarType = SnackbarType.INFO, afterClosing?: () => void, afterOpening?: () => void): ComponentRef<SnackbarComponent> {
    if (isNullOrUndefined(message) || message === '') {
      return;
    }

    if (this._componentRefs.length === this.config.maxCount) {
      const oldestSnackbar: ComponentRef<SnackbarComponent> = this._componentRefs[0];
      oldestSnackbar.instance.close();
      this._componentRefs.slice(0, 1);
    }

    const componentRef: ComponentRef<SnackbarComponent> = this.createComponentRef();
    componentRef.instance.message = message;
    componentRef.instance.type = type;

    let snackbarTimeout$: any = null;

    const afterOpeningEvent$ = componentRef.instance.afterOpening.subscribe(() => {
      snackbarTimeout$ = setTimeout(() => {
        componentRef.instance.close();
      }, this.getTimeoutBySnackbarType(type));

      if (!isNullOrUndefined(afterOpening)) {
        afterOpening();
      }
    });

    const afterClosingEvent$ = componentRef.instance.afterClosing.subscribe(() => {
      this.close(componentRef);

      if (!isNullOrUndefined(afterClosing)) {
        afterClosing();
      }
    });

    componentRef.onDestroy(() => {
      this._componentRefs = this._componentRefs.filter((cr) => cr !== componentRef);
      afterOpeningEvent$.unsubscribe();
      afterClosingEvent$.unsubscribe();
      clearTimeout(snackbarTimeout$);
    });

    this.addElementToDOM(componentRef);
    this._componentRefs.push(componentRef);

    return componentRef;
  }

  public close(ref: ComponentRef<SnackbarComponent>): void {
    this.appRef.detachView(ref.hostView);
    ref.destroy();
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

  private getTimeoutBySnackbarType(type: SnackbarType): number {
    switch (type) {
      case SnackbarType.WARNING: {
        return this.config.timeout.warning;
      }
      case SnackbarType.ERROR: {
        return this.config.timeout.error;
      }
      default: {
        return this.config.timeout.default;
      }
    }
  }
}
