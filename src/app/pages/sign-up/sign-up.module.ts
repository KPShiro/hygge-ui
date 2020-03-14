import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { InvalidInvitationComponent } from './components/invalid-invitation/invalid-invitation.component';
import { InvitationResolver } from './guards/invitation-resolver/invitation-resolver.guard';


@NgModule({
    declarations: [
        SignUpComponent,
        InvalidInvitationComponent
    ],
    imports: [
        CommonModule,
        SignUpRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        InvitationResolver,
    ],
})
export class SignUpModule { }
