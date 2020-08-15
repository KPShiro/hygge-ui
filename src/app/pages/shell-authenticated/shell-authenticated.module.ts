import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { ShellAuthenticatedRoutingModule } from './shell-authenticated-routing.module';
import { MainNavbarComponent } from '@app/common/components/main-navbar/main-navbar.component';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    imports: [
        ShellAuthenticatedRoutingModule,
        CommonModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        ShellAuthenticatedComponent,
        MainNavbarComponent,
    ],
    providers: [],
})
export class ShellAuthenticatedModule { }
