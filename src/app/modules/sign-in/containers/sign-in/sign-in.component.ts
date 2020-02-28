import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { Observable } from 'rxjs';
import { Token } from '@modules/auth/models/token.model';
import { SharedFacade } from '@modules/shared/shared.facade';


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
    private readonly sharedFacade: SharedFacade,
    private readonly authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
    this.isProcessing$ = this.sharedFacade.isProcessing$;
    this.errors$ = this.authFacade.getSignInErrors$();
    this.token$ = this.authFacade.getToken$();
  }

  public signIn(): void {
    this.authFacade.signIn('user@app.com', 'test');
  }

  public fakeSignIn(): void {
    this.authFacade.signIn('user@app.com', 'test123');
  }
}
