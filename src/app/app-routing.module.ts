import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/sign-in',
    },
    {
        path: '',
        loadChildren: () => import('@pages/shell-authenticated/shell-authenticated.module').then((m) => m.ShellAuthenticatedModule),
    },
    {
        path: 'sign-in',
        loadChildren: () => import('@pages/sign-in/sign-in.module').then((m) => m.SignInModule),
    },
    {
        path: 'sign-up',
        loadChildren: () => import('@pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    },
    {
        path: '**',
        loadChildren: () => import('@pages/core/core.module').then((m) => m.CoreModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
