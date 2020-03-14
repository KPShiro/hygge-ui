import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@modules/core/containers/app/app.component';
import { CoreModule } from '@modules/core/core.module';
import { NotFoundComponent } from './modules/core/containers/not-found/not-found.component';
import { AppLoaderComponent } from './modules/core/containers/app-loader/app-loader.component';
import { SharedModule } from '@modules/shared/shared.module';
import { SnackbarModule } from '@modules/snackbar/snackbar.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserModule } from '@modules/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CoreModule,
    SharedModule.forRoot(),
    SnackbarModule.forRoot(),
    UserModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
