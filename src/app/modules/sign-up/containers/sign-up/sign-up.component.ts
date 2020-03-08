import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordMatch } from '@modules/sign-up/helpers/password-match-validator/password-match.validator';
import { isNullOrUndefined } from 'util';
import { SharedFacade } from '@modules/shared/shared.facade';
import { Observable, Subject } from 'rxjs';
import { AuthFacade } from '@modules/auth/auth.facade';
import { ISignUpDto } from '@modules/auth/dtos/sign-up.dto';
import { SignUpFacade } from '@modules/sign-up/sign-up.facade';
import { AvailabilityValidators } from '@modules/sign-up/helpers/availability-validators/availability.validator';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private readonly _destroy: Subject<void> = new Subject();

  private passwordForm?: FormGroup;
  private personaForm?: FormGroup;
  private companyForm?: FormGroup;

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

  public get companyNameControl(): FormControl {
    return this.companyForm.get('companyName') as FormControl;
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sharedFacade: SharedFacade,
    private readonly authFacade: AuthFacade,
    private readonly signUpFacade: SignUpFacade,
    private readonly route: ActivatedRoute,
  ) { }

  public get companyNameRequired(): boolean {
    return isNullOrUndefined(this.companyNameControl.value);
  }

  public ngOnInit(): void {
    this.isProcessing$ = this.sharedFacade.isProcessing$;
    this.buildForm();

    const invitationData = this.route.snapshot.data.invitationData;
    this.usernameControl.setValue(invitationData.email);
    this.companyNameControl.setValue(invitationData.companyName);
  }

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public createAccount(): void {
    const accountData: ISignUpDto = {
      email: this.usernameControl.value,
      password: this.passwordControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      companyName: this.companyNameControl.value,
    };

    this.authFacade.signUp(accountData);
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

    this.companyForm = this.formBuilder.group({
      companyName: [
        null,
        [Validators.required],
        AvailabilityValidators.IsCompanyNameAvailable(this.signUpFacade),
      ],
    });

    this.signUpForm = this.formBuilder.group({
      passwordForm: this.passwordForm,
      personaForm: this.personaForm,
      companyForm: this.companyForm,
    });
  }
}
