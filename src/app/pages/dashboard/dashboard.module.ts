import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@features/shared/shared.module';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        SharedModule,
        DashboardRoutingModule,
    ]
})
export class DashboardModule { }
