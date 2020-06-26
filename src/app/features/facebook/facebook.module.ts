import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { FacebookSdkService } from './services/facebook-sdk/facebook-sdk.service';


@NgModule()
export class FacebookModule {
    public constructor(@Optional() @SkipSelf() parentModule?: FacebookModule) {
        if (parentModule) {
            throw new Error('FacebookModule is already loaded. Import it in the AppModule only!');
        }
    }

    public static forRoot(): ModuleWithProviders<FacebookModule> {
        return {
            ngModule: FacebookModule,
            providers: [
                FacebookSdkService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: (fbSdkService: FacebookSdkService) => () => { fbSdkService.init() },
                    deps: [FacebookSdkService],
                    multi: true,
                }
            ]
        };
    }
}
