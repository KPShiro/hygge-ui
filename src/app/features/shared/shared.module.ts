import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        NgbModule,
    ],
    exports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        NgbModule,
    ],
})
export class SharedModule { }
