import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    declarations: [
        SignInComponent,
    ],
    imports: [
        SharedModule,
        SignInRoutingModule,
        ReactiveFormsModule,
    ]
})
export class SignInModule { }
