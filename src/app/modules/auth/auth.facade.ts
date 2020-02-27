import { Injectable } from "@angular/core";
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { Token } from './models/token.model';
import { Router } from '@angular/router';
import { SharedFacade } from '@modules/shared/shared.facade';


@Injectable()
export class AuthFacade {
  public constructor(
    private readonly sharedFacade: SharedFacade,
    private readonly authService: AuthService,
    private readonly authState: AuthState,
    private readonly router: Router,
  ) { }

  public signIn(username: string, password: string): void {
    this.sharedFacade.setIsProcessing(true);
    this.authState.setSignInErrors([]);
    this.authService
      .signIn(username, password)
      .subscribe(
        (token) => {
          this.sharedFacade.setIsProcessing(false);
          this.authState.setToken(token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.sharedFacade.setIsProcessing(false);
          this.authState.setSignInErrors([error.message]);
        }
      );
  }

  public signOut(): void {
    this.sharedFacade.setIsProcessing(true);
    this.authService
      .signOut()
      .subscribe(() => {
        this.sharedFacade.setIsProcessing(false);
        this.authState.setToken(null);
        this.authState.setUser(null);
        this.router.navigate(['/']);
      });
  }

  public getUserData(): void {
    this.sharedFacade.setIsProcessing(true);
    this.authService
      .getUserData()
      .subscribe(
        (user) => {
          this.sharedFacade.setIsProcessing(false);
          this.authState.setUser(user);
        },
        (error) => {
          this.sharedFacade.setIsProcessing(false);
        }
      );
  }

  public isProcessing$(): Observable<boolean> {
    return this.sharedFacade.isProcessing$;
  }

  public getUser$(): Observable<User> {
    return this.authState.getUser$();
  }

  public getToken$(): Observable<Token> {
    return this.authState.getToken$();
  }

  public getSignInErrors$(): Observable<string[]> {
    return this.authState.getSignInErrors$();
  }
}
