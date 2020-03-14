import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordMatch } from '@modules/sign-up/helpers/password-match-validator/password-match.validator';
import { SharedFacade } from '@modules/shared/shared.facade';
import { Observable, Subject } from 'rxjs';
import { SignUpFacade } from '@modules/sign-up/sign-up.facade';
import { AvailabilityValidators } from '@modules/sign-up/helpers/availability-validators/availability.validator';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '@modules/user/services/user-facade/user-facade.service';
import { ICreateUserDto } from '@modules/user/interfaces/create-user-dto.interface';
import { IInvitationDetails } from '@modules/sign-up/models/invitation-details.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public signUpForm?: FormGroup;
  public isProcessing$?: Observable<boolean>;

  public get usernameControl(): FormControl {
    return this.personaForm.get('username') as FormControl;
  }

  public get firstNameControl(): FormControl {
    return this.personaForm.get('firstName') as FormControl;
  }

  public get lastNameControl(): FormControl {
    return this.personaForm.get('lastName') as FormControl;
  }

  public get confirmPasswordControl(): FormControl {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.passwordForm.get('password') as FormControl;
  }

  private readonly _destroy: Subject<void> = new Subject();
  private invitationDetails?: IInvitationDetails;
  private passwordForm?: FormGroup;
  private personaForm?: FormGroup;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly sharedFacade: SharedFacade,
    private readonly signUpFacade: SignUpFacade,
    private readonly _userFacade: UserFacade,
  ) { }

  public get isFormValid(): boolean {
    const result: boolean =
      this.usernameControl.valid &&
      this.firstNameControl.valid &&
      this.lastNameControl.valid &&
      this.passwordControl.valid &&
      this.confirmPasswordControl.valid;

    return result;
  }

  public ngOnInit(): void {
    this.invitationDetails = this.route.snapshot.data.invitationDetails;
    this.isProcessing$ = this.sharedFacade.isProcessing$;
    this.buildForm();

    // TODO: This is a workaround... Find a way to trigger validation manually as updateValueAndValidity() does not work
    setTimeout(() => {
      this.usernameControl.setValue(this.invitationDetails.userEmail);
      this.usernameControl.markAsTouched();
    }, 0);
  }

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public createAccount(): void {
    const accountData: ICreateUserDto = {
      email: this.usernameControl.value,
      password: this.passwordControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      companyId: this.invitationDetails.companyId,
    };

    this._userFacade.createAccount(accountData);
  }

  private buildForm(): void {
    this.personaForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.email],
        AvailabilityValidators.IsUsernameAvailable(this.signUpFacade),
      ],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });

    this.passwordForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validators: [
        PasswordMatch('password', 'confirmPassword'),
      ],
    });

    this.signUpForm = this.formBuilder.group({
      passwordForm: this.passwordForm,
      personaForm: this.personaForm,
    });
  }
}
