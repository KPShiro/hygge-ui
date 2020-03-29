import { NgModule } from '@angular/core';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { ShellAuthenticatedRoutingModule } from './shell-authenticated-routing.module';
import { MainNavbarComponent } from '@app/components/main-navbar/main-navbar.component';


@NgModule({
    imports: [
        ShellAuthenticatedRoutingModule,
    ],
    exports: [],
    declarations: [
        ShellAuthenticatedComponent,
        MainNavbarComponent,
    ],
    providers: [],
})
export class ShellAuthenticatedModule { }
