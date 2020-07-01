import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html',
  styleUrls: ['./invitation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationCardComponent {
  @Input() public data: any;
  @Output() public delete: EventEmitter<string> = new EventEmitter();

  // TODO: Implement confirmation dialog
  public onDeleteClicked(): void {
    const result: boolean = confirm('Do you really want to remove this invitation?');

    if (result === true) {
      this.delete.emit(this.data._id);
    }
  }
}
