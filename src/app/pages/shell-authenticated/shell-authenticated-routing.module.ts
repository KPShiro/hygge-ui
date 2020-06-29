import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { IsAuthenticatedGuard } from '@features/auth/guards/is-authenticated.guard';


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
                loadChildren: () => import('@pages/company-profile/company-profile.module').then((m) => m.CompanyProfileModule),
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
