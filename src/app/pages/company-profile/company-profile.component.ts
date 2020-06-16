import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
// import { CompanyFacadeService } from '@features/company/services/company-facade/company-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    // private readonly _companyFacade: CompanyFacadeService,
  ) { }

  public ngOnInit(): void {
    this.employees = this._route.snapshot.data.employees;
    this.invitations = this._route.snapshot.data.invitations;

    console.table(this.employees);
    console.table(this.invitations);

    this.invitationForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  public sendInvitation(): void {
    console.log(this.invitationForm.value);
  }

}
