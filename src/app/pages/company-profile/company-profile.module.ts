import { NgModule } from '@angular/core';
import { CompanyProfileComponent } from './container/company-profile.component';
import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { InvitationCardComponent } from './components/invitation-card/invitation-card.component';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    declarations: [
        CompanyProfileComponent,
        EmployeeCardComponent,
        InvitationCardComponent,
    ],
    imports: [
        SharedModule,
        CompanyProfileRoutingModule,
    ]
})
export class CompanyProfileModule { }
