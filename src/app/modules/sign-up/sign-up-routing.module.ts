import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { VerifyInvitationGuard } from './guards/verify-invitation/verify-invitation.guard';
import { InvalidInvitationComponent } from './containers/invalid-invitation/invalid-invitation.component';


const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    canActivate: [
      VerifyInvitationGuard,
    ],
  },
  {
    path: 'invalid-invitation',
    component: InvalidInvitationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
