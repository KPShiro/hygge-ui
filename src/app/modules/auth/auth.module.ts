import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { AuthFacade } from './auth.facade';
import { SharedModule } from '@modules/shared/shared.module';


@NgModule({
  providers: [
    AuthService,
    AuthState,
    AuthFacade,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class AuthModule { }
