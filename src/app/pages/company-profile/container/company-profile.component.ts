import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyFacadeService } from '@features/company/services/company-facade/company-facade.service';
import { switchMap } from 'rxjs/operators';
// import { UserFacadeService } from '@features/user/services/user-facade/user-facade.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  public employees: any[] = [];
  public invitations: IInvitation[] = [];

  public invitationForm?: FormGroup;

  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _companyFacade: CompanyFacadeService,
    // private readonly _userFacade: UserFacadeService,
  ) { }

  public ngOnInit(): void {
    this.employees = this._route.snapshot.data.employees;
    this.invitations = this._route.snapshot.data.invitations;

    this.invitationForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  public createInvitation(): void {
    const email: string = this.invitationForm.value;

    if (email === '' || email === undefined || email === null) {
      return;
    }

    this._companyFacade.createInvitation(email).pipe(
      switchMap(() => this._companyFacade.getInvitations()),
    ).subscribe((invitations) => {
      this.invitations = invitations;
      this.invitationForm.reset();
    });
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
    // this._userFacade.deleteAccount({
    //   deleteForever: true,
    //   id,
    // }).pipe(
    //   switchMap(() => this._companyFacade.getEmployees()),
    // ).subscribe((employees) => {
    //   this.employees = employees;
    // });
  }

}
