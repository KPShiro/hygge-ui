import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { IsAuthenticatedGuard } from '@features/auth/guards/is-authenticated.guard';
import { CompanyProfileComponent } from '@pages/company-profile/company-profile.component';


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
                component: CompanyProfileComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellAuthenticatedRoutingModule { }
