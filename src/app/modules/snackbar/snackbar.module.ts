import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './component/snackbar.component';
import { SnackbarService } from './services/snackbar.service';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SnackbarService,
  ],
  entryComponents: [
    SnackbarComponent,
  ],
})
export class SnackbarModule { }
