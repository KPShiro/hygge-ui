import { NgModule } from '@angular/core';
import { SharedModule } from '@features/shared/shared.module';
import { ErrorsRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from '../not-found/not-found.component';
import { InvalidInvitationComponent } from '../invalid-invitation/invalid-invitation.component';


@NgModule({
    declarations: [
        NotFoundComponent,
        InvalidInvitationComponent,
    ],
    imports: [
        SharedModule,
        ErrorsRoutingModule,
    ]
})
export class ErrorsModule { }
