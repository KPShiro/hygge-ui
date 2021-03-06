import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SnackbarModule } from '@features/snackbar/snackbar.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthModule } from '@features/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CompanyModule } from '@features/company/company.module';
import { UserModule } from '@features/user/user.module';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { InvalidInvitationComponent } from '@pages/invalid-invitation/invalid-invitation.component';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { AppComponent } from './common/components/app-container/app.component';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const ngrx = [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
    }),
];

const features = [
    AuthModule.forRoot(),
    UserModule.forRoot(),
    CompanyModule.forRoot(),
    SnackbarModule.forRoot(),
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        InvalidInvitationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            }
        }),
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
