import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { AuthFacade } from './auth.facade';
import { SharedModule } from '@modules/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthState,
        AuthFacade,
      ],
    };
  }
}
