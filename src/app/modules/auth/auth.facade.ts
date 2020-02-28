import { Injectable } from "@angular/core";
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { Token } from './models/token.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthFacade {
  public constructor(
    private readonly authService: AuthService,
    private readonly authState: AuthState,
    private readonly router: Router,
  ) { }

  public signIn(username: string, password: string): void {
    this.authState.setSignInErrors([]);
    this.authService
      .signIn(username, password)
      .subscribe((token) => {
        this.authState.setToken(token);
        this.router.navigate(['/dashboard']);
      });
  }

  public signOut(): void {
    this.authService
      .signOut()
      .subscribe(() => {
        this.authState.setToken(null);
        this.authState.setUser(null);
        this.router.navigate(['/']);
      });
  }

  public getUserData(): void {
    this.authService
      .getUserData()
      .subscribe((user) => {
        this.authState.setUser(user);
      });
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

  public getAuthTokenValue(): string | null {
    return this.authState.getAuthTokenValue();
  }
}
