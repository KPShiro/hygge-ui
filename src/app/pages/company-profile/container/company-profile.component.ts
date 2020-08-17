import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
import { CompanyFacadeService } from '@features/company/services/company-facade/company-facade.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateInvitationModalComponent } from '../components/create-invitation-modal/create-invitation-modal.component';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  public employees: any[] = [];
  public invitations: IInvitation[] = [];

  public constructor(
    private readonly _route: ActivatedRoute,
    private readonly _companyFacade: CompanyFacadeService,
    private readonly _modalService: NgbModal,
  ) { }

  public ngOnInit(): void {
    this.employees = this._route.snapshot.data.employees;
    this.invitations = this._route.snapshot.data.invitations;
  }

  public deleteInvitation(id: string): void {
    this._companyFacade.deleteInvitation(id).pipe(
      switchMap(() => this._companyFacade.getInvitations()),
    ).subscribe((invitations) => {
      this.invitations = invitations;
    });
  }

  public deleteUserAccount(id: string): void {
    console.log(id);
  }

  public onCreateInvitationClick(): void {
    this._modalService.open(CreateInvitationModalComponent, { centered: true });
  }

}
