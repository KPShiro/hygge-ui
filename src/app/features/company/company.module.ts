import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CompanyApiService } from './services/company-api/company-api.service';
import { InvitationResolver } from './guards/invitation-resolver/invitation-resolver.guard';


@NgModule({
    imports: [],
})
export class CompanyModule {
    public constructor(@Optional() @SkipSelf() parentModule?: CompanyModule) {
        if (parentModule) {
            throw new Error('CompanyModule is already loaded. Import it in the AppModule only!');
        }
    }

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompanyModule,
            providers: [
                CompanyApiService,
                InvitationResolver,
            ]
        };
    }
}
