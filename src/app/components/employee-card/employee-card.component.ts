import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: ['./employee-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent {
    @Input() public data?: any;
}
