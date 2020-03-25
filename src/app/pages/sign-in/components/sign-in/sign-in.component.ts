import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm?: FormGroup;

  public get usernameField(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  public get passwordField(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  public errors$: Observable<string[]> = this._authFacade.errors$;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authFacade: AuthFacadeService,
  ) { }

  public ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['user@app.com', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]],
    });
  }

  public signIn(): void {
    this._authFacade.signInWithUsernameAndPassword(this.usernameField.value, this.passwordField.value);
  }
}
