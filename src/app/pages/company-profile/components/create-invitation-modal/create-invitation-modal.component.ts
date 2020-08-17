import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyFacadeService } from '@features/company/services/company-facade/company-facade.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-create-invitation-modal',
  templateUrl: './create-invitation-modal.component.html',
  styleUrls: ['./create-invitation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvitationModalComponent implements OnInit {

  public invitationForm?: FormGroup;

  public get firstNameControl(): FormControl {
    return this.invitationForm.get('firstName') as FormControl;
  }

  public get lastNameControl(): FormControl {
    return this.invitationForm.get('lastName') as FormControl;
  }

  public get emailControl(): FormControl {
    return this.invitationForm.get('email') as FormControl;
  }

  public constructor(
    public modal: NgbActiveModal,
    private readonly _formBuilder: FormBuilder,
    private readonly _companyFacade: CompanyFacadeService,
  ) { }

  public ngOnInit(): void {
    this.invitationForm = this._formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public sendInvitation(): void {
    const email: string = this.invitationForm.value;

    if (email === '' || email === undefined || email === null) {
      return;
    }

    this._companyFacade.createInvitation(email).pipe(
      switchMap(() => this._companyFacade.getInvitations()),
    ).subscribe((invitations) => {
      // this.invitations = invitations;
      console.log(invitations);
      this.invitationForm.reset();
    });
  }

}
