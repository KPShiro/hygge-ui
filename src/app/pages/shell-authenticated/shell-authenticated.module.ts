import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { ShellAuthenticatedRoutingModule } from './shell-authenticated-routing.module';
import { MainNavbarComponent } from '@app/components/main-navbar/main-navbar.component';


@NgModule({
    imports: [
        ShellAuthenticatedRoutingModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        ShellAuthenticatedComponent,
        MainNavbarComponent,
    ],
    providers: [],
})
export class ShellAuthenticatedModule { }
