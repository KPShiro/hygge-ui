import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@features/core/components/not-found/not-found.component';
import { IsAuthenticatedGuard } from '@features/auth/guards/is-authenticated.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [ IsAuthenticatedGuard ],
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
    path: '',
    pathMatch: 'full',
    redirectTo: '/sign-in',
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
