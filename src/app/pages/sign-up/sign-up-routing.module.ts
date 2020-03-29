import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './container/sign-up.component';
import { VerifyInvitationGuard } from '@features/company/guards/verify-invitation/verify-invitation.guard';
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignUpRoutingModule { }
