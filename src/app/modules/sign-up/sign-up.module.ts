import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { InvalidInvitationComponent } from './containers/invalid-invitation/invalid-invitation.component';


@NgModule({
    declarations: [
        SignUpComponent,
        InvalidInvitationComponent
    ],
    imports: [
        CommonModule,
        SignUpRoutingModule,
        ReactiveFormsModule,
    ]
})
export class SignUpModule { }
