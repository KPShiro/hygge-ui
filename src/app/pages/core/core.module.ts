import { NgModule } from '@angular/core';
import { SharedModule } from '@features/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    imports: [
        SharedModule,
        CoreRoutingModule,
    ]
})
export class CoreModule { }
