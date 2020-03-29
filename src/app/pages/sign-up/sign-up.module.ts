import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './container/sign-up.component';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    declarations: [
        SignUpComponent,
    ],
    imports: [
        SharedModule,
        SignUpRoutingModule,
        ReactiveFormsModule,
    ],
})
export class SignUpModule { }
