import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserFacade } from './services/user-facade/user-facade.service';
import { UserApi } from './services/user-api/user-api.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('user', reducer),
    ],
    exports: [
        StoreModule,
    ],
})
export class UserModule {
    constructor(@Optional() @SkipSelf() parentModule?: UserModule) {
        if (parentModule) {
            throw new Error(
                'UserModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserApi,
                UserFacade,
            ],
        };
    }
}
