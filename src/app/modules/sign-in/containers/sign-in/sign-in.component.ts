import { Component, OnInit } from '@angular/core';
import { AuthReducer } from '@modules/auth/auth.reducer';
import { Observable } from 'rxjs';
import { Token } from '@modules/auth/models/token.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public isProcessing$!: Observable<boolean>;
  public errors$!: Observable<string[]>;
  public token$!: Observable<Token>;

  public constructor(
    private readonly authReducer: AuthReducer,
  ) { }

  ngOnInit(): void {
    this.isProcessing$ = this.authReducer.isProcessing$();
    this.errors$ = this.authReducer.getSignInErrors$();
    this.token$ = this.authReducer.getToken$();
  }

  public signIn(): void {
    this.authReducer.signIn('user@app.com', 'test');
  }

  public fakeSignIn(): void {
    this.authReducer.signIn('user@app.com', 'test123');
  }
}
