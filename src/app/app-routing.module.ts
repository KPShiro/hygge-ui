import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { InvalidInvitationComponent } from '@pages/invalid-invitation/invalid-invitation.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
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
        path: 'invalid-invitation',
        component: InvalidInvitationComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
