import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { AuthApiService } from './services/auth-api/auth-api.service';
import { AuthFacadeService } from './services/auth-facade/auth-facade.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthStateService } from './services/auth-state/auth-state.service';


@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature(
            'auth', reducer,
        ),
        EffectsModule.forFeature([AuthEffects]),
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
