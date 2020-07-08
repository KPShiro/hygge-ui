import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthApiService } from './services/auth-api/auth-api.service';
import { AuthFacadeService } from './services/auth-facade/auth-facade.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthStateService } from './services/auth-state/auth-state.service';


@NgModule({
    imports: [
        HttpClientModule,
    ]
})
export class AuthModule {
    public constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only!');
        }
    }

    public static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthApiService,
                AuthFacadeService,
                AuthStateService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ]
        };
    }
}
