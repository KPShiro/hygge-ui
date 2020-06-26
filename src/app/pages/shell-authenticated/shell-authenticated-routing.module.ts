import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { IsAuthenticatedGuard } from '@features/auth/guards/is-authenticated.guard';
import { CompanyProfileComponent } from '@pages/company-profile/company-profile.component';
import { EmployeesResolver } from '@features/company/guards/employees-resolver/employees-resolver.guard';
import { InvitationsListResolver } from '@features/company/guards/invitations-list-resolver/invitations-list-resolver.guard';


const routes: Routes = [
    {
        path: '',
        component: ShellAuthenticatedComponent,
        canActivate: [IsAuthenticatedGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('@pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'profile/company',
                resolve: {
                    employees: EmployeesResolver,
                    invitations: InvitationsListResolver,
                },
                component: CompanyProfileComponent,
            },
            {
                path: 'profile/user',
                loadChildren: () => import('@pages/user-profile/user-profile.module').then((m) => m.UserProfileModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellAuthenticatedRoutingModule { }
