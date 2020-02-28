import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFacade } from './shared.facade';
import { SharedState } from './state/shared.state';
import { SnackbarModule } from '@modules/snackbar/snackbar.module';


@NgModule({
  imports: [
    CommonModule,
    SnackbarModule,
  ],
  exports: [
    SnackbarModule,
  ]
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
