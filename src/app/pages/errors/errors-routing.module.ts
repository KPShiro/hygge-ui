import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { InvalidInvitationComponent } from '../invalid-invitation/invalid-invitation.component';


const routes: Routes = [
    {
        path: 'invalid-invitation',
        component: InvalidInvitationComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorsRoutingModule { }
