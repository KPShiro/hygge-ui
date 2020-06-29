import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './container/company-profile.component';
import { EmployeesResolver } from '@features/company/guards/employees-resolver/employees-resolver.guard';
import { InvitationsListResolver } from '@features/company/guards/invitations-list-resolver/invitations-list-resolver.guard';


const routes: Routes = [
    {
        path: '',
        resolve: {
            employees: EmployeesResolver,
            invitations: InvitationsListResolver,
        },
        component: CompanyProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
