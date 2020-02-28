import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFacade } from './shared.facade';
import { SharedState } from './state/shared.state';


@NgModule({
  imports: [
    CommonModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        SharedState,
        SharedFacade,
      ]
    };
  }
}
