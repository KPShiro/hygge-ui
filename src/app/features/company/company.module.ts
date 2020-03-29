import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CompanyApiService } from './services/company-api/company-api.service';
import { InvitationResolver } from './guards/invitation-resolver/invitation-resolver.guard';
import { CompanyFacadeService } from './services/company-facade/company-facade.service';


@NgModule({
    imports: [],
})
export class CompanyModule {
    public constructor(@Optional() @SkipSelf() parentModule?: CompanyModule) {
        if (parentModule) {
            throw new Error('CompanyModule is already loaded. Import it in the AppModule only!');
        }
    }

    public static forRoot(): ModuleWithProviders<CompanyModule> {
        return {
            ngModule: CompanyModule,
            providers: [
                CompanyApiService,
                CompanyFacadeService,
                InvitationResolver,
            ]
        };
    }
}
