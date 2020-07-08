import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
import { OrganizationInvitationStatus } from '@app/common/enum/organization-invitation-status.enum';


@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html',
  styleUrls: ['./invitation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationCardComponent {
  @Input() public data: IInvitation;
  @Output() public delete: EventEmitter<string> = new EventEmitter();
  @ViewChild('getLinkBtn') public getLinkBtn: NgbTooltip;

  public canCopyLink = true;

  public get wasSent(): boolean {
    return this.data.status === OrganizationInvitationStatus.SENT;
  }

  public get wasOpened(): boolean {
    return this.data.status === OrganizationInvitationStatus.OPENED;
  }

  public get wasClosed(): boolean {
    return this.data.status === OrganizationInvitationStatus.CLOSED;
  }

  // TODO: Implement confirmation dialog
  public onDeleteClicked(): void {
    const result: boolean = confirm('Do you really want to remove this invitation?');

    if (result === true) {
      this.delete.emit(this.data._id);
    }
  }

  public onCopyLinkClicked(): void {
    this.canCopyLink = false;
    this.getLinkBtn.open();

    document.addEventListener('copy', this.copyUrlToClipboard.bind(this));
    document.execCommand('copy');
    document.removeEventListener('copy', this.onCopyLinkClicked.bind(this));

    setTimeout(() => {
      this.canCopyLink = true;
      this.getLinkBtn.close();
    }, 500);
  }

  private copyUrlToClipboard(event: any): void {
    event.clipboardData.setData('text/plain', 'http://localhost:4200/sign-up?invitationId=' + this.data._id);
    event.preventDefault();
  }
}
