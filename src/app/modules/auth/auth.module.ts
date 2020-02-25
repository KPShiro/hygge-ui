import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { AuthFacade } from './auth.facade';


@NgModule({
  providers: [
    AuthService,
    AuthState,
    AuthFacade,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
