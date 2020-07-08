import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './container/sign-up.component';
import { InvitationResolver } from '@features/company/guards/invitation-resolver/invitation-resolver.guard';


const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        resolve: {
            invitationDetails: InvitationResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignUpRoutingModule { }
