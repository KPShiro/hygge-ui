import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@containers/not-found/not-found.component';


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