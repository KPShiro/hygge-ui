import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyInvitationGuard } from '@features/company/guards/verify-invitation/verify-invitation.guard';
import { InvalidInvitationComponent } from './components/invalid-invitation/invalid-invitation.component';
import { InvitationResolver } from '@features/company/guards/invitation-resolver/invitation-resolver.guard';


const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        resolve: {
            invitationDetails: InvitationResolver,
        },
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
