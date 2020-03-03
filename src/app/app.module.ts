import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@modules/core/containers/app/app.component';
import { CoreModule } from '@modules/core/core.module';
import { NotFoundComponent } from './modules/core/containers/not-found/not-found.component';
import { AuthModule } from '@modules/auth/auth.module';
import { AppLoaderComponent } from './modules/core/containers/app-loader/app-loader.component';
import { SharedModule } from '@modules/shared/shared.module';
import { SnackbarModule } from '@modules/snackbar/snackbar.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule.forRoot(),
    SharedModule.forRoot(),
    SnackbarModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
