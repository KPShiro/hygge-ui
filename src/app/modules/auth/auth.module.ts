import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { AuthReducer } from './auth.reducer';


@NgModule({
  providers: [
    AuthService,
    AuthState,
    AuthReducer,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
