import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { SnackbarComponent } from '../component/snackbar.component';


@Injectable()
export class SnackbarService {

  public snackbarComponentRef!: ComponentRef<SnackbarComponent>;

  public constructor(
    private readonly factoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
  ) { }

  public open(message: string): void {
    const factory = this.factoryResolver.resolveComponentFactory(SnackbarComponent);
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbarComponentRef = componentRef;
  }

  public close(): void {
    this.appRef.detachView(this.snackbarComponentRef.hostView);
    this.snackbarComponentRef.destroy();
  }
}
