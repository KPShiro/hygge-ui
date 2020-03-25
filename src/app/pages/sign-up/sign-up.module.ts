import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { InvalidInvitationComponent } from './components/invalid-invitation/invalid-invitation.component';
import { InvitationResolver } from './guards/invitation-resolver/invitation-resolver.guard';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    declarations: [
        SignUpComponent,
        InvalidInvitationComponent
    ],
    imports: [
        SharedModule,
        SignUpRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        InvitationResolver,
    ],
})
export class SignUpModule { }
