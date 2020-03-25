import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@features/core/components/app/app.component';
import { NotFoundComponent } from './features/core/components/not-found/not-found.component';
import { AppLoaderComponent } from './features/core/components/app-loader/app-loader.component';
import { SnackbarModule } from '@features/snackbar/snackbar.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthModule } from '@features/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '@features/core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';


const ngrx = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
];

const features = [
  CoreModule,
  SnackbarModule.forRoot(),
  AuthModule.forRoot(),
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...ngrx,
    ...features,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
