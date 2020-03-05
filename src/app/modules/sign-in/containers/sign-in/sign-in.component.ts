import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { Observable } from 'rxjs';
import { Token } from '@modules/auth/models/token.model';
import { SharedFacade } from '@modules/shared/shared.facade';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public isProcessing$!: Observable<boolean>;
  public errors$!: Observable<string[]>;
  public token$!: Observable<Token>;

  public signInForm?: FormGroup;

  public get usernameField(): AbstractControl {
    if (isNullOrUndefined(this.signInForm)) {
      return;
    }

    return this.signInForm.get('username');
  }

  public get passwordField(): AbstractControl {
    if (isNullOrUndefined(this.signInForm)) {
      return;
    }

    return this.signInForm.get('password');
  }

  public constructor(
    private readonly sharedFacade: SharedFacade,
    private readonly authFacade: AuthFacade,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.isProcessing$ = this.sharedFacade.isProcessing$;
    this.errors$ = this.authFacade.getSignInErrors$();
    this.token$ = this.authFacade.getToken$();
  }

  public buildForm(): void {
    this.signInForm = this.formBuilder.group({
      username: ['user@app.com', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]],
    });
  }

  public signIn(): void {
    this.authFacade.signIn(this.usernameField.value, this.passwordField.value);
  }
}
