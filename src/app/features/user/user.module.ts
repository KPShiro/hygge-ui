import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserApiService } from './services/user-api/user-api.service';
import { UserFacadeService } from './services/user-facade/user-facade.service';
import { reducer } from './state/user.reducer';
import { UserEffects } from './state/user.effects';


@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature(
            'user', reducer,
        ),
        EffectsModule.forFeature([UserEffects]),
    ],
})
export class UserModule {
    public constructor(@Optional() @SkipSelf() parentModule?: UserModule) {
        if (parentModule) {
            throw new Error('UserModule is already loaded. Import it in the AppModule only!');
        }
    }

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserApiService,
                UserFacadeService,
            ],
        };
    }
}
