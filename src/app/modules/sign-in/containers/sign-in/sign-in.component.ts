import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models/user.model';
import { filter, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<any> = new Subject();

  public user$!: Observable<User>;
  public isProcessing$!: Observable<boolean>;
  public errors$!: Observable<string[]>;

  public constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.isProcessing$ = this.authFacade.isProcessing$();
    this.errors$ = this.authFacade.getSignInErrors$();
    this.user$ = this.authFacade.getUser$();

    this.user$.pipe(
      takeUntil(this.unsubscribe),
      filter((user) => !isNullOrUndefined(user)),
    ).subscribe(() => this.router.navigate(['/dashboard']));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public signIn(): void {
    this.authFacade.signIn('user@app.com', 'test');
  }

  public fakeSignIn(): void {
    this.authFacade.signIn('user@app.com', 'test123');
  }

}
