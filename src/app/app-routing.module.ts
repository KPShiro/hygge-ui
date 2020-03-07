import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@modules/core/containers/not-found/not-found.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('@modules/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('@modules/sign-up/sign-up.module').then((m) => m.SignUpModule),
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
