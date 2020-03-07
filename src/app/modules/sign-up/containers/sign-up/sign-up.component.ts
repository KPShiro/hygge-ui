import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordMatch } from '@modules/sign-up/helpers/password-match-validator/password-match.validator';
import { isNullOrUndefined } from 'util';
import { SharedFacade } from '@modules/shared/shared.facade';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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
  ) { }

  public get companyNameRequired(): boolean {
    return !isNullOrUndefined(this.companyForm);
  }

  public ngOnInit(): void {
    this.isProcessing$ = this.sharedFacade.isProcessing$;

    this.personaForm = this.formBuilder.group({
      username: ['dev@test.com', [Validators.required, Validators.email]],
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
      companyName: [null, [Validators.required]],
    });

    this.signUpForm = this.formBuilder.group({
      passwordForm: this.passwordForm,
      personaForm: this.personaForm,
      companyForm: this.companyForm,
    });
  }

  public createAccount(): void {
    const accountData: any = {
      username: this.usernameControl.value,
      password: this.passwordControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      companyName: this.companyNameControl.value,
    };

    console.log(accountData);
  }
}
