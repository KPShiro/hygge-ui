import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
  @Input() public data: any;
  @Output() public delete: EventEmitter<void> = new EventEmitter();

  public onDeleteClick(): void {
    this.delete.emit(this.data.id);
  }
}
