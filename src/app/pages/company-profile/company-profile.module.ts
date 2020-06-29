import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './container/company-profile.component';
import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';


@NgModule({
    declarations: [
        CompanyProfileComponent,
        EmployeeCardComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CompanyProfileRoutingModule,
    ]
})
export class CompanyProfileModule { }
