import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './component/snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { defaultSnacbarConfig, SNACKBAR_CONFIG, SnackbarConfig } from './snackbar.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    SnackbarComponent,
  ],
})
export class SnackbarModule {

  public constructor(
    private readonly service: SnackbarService,
  ) {
    this.service.init();
  }

  public static forRoot(config?: SnackbarConfig): ModuleWithProviders {
    return {
      ngModule: SnackbarModule,
      providers: [
        SnackbarService,
        {
          provide: SNACKBAR_CONFIG,
          useValue: {
            ...defaultSnacbarConfig,
            ...config,
          },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    };
  }
}
