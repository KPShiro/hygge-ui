import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@containers/app/app.component';
import { CoreModule } from '@modules/core/core.module';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AuthModule } from '@modules/auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppLoaderComponent } from './containers/app-loader/app-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
