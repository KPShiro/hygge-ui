import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { UserFacade } from '@modules/user/services/user-facade/user-facade.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
    private readonly _formBuilder: FormBuilder,
    private readonly _userFacade: UserFacade,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['user@app.com', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]],
    });
  }

  public signIn(): void {
    this._userFacade.signInWithUsernameAndPassword(this.usernameField.value, this.passwordField.value);
  }
}
