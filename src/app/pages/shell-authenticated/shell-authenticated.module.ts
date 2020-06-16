import { NgModule } from '@angular/core';
import { ShellAuthenticatedComponent } from './container/shell-authenticated.component';
import { ShellAuthenticatedRoutingModule } from './shell-authenticated-routing.module';
import { MainNavbarComponent } from '@app/components/main-navbar/main-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyProfileComponent } from '@pages/company-profile/company-profile.component';


@NgModule({
    imports: [
        ShellAuthenticatedRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        ShellAuthenticatedComponent,
        MainNavbarComponent,
        CompanyProfileComponent,
    ],
    providers: [],
})
export class ShellAuthenticatedModule { }
