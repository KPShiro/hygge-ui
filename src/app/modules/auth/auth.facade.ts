import { Injectable } from "@angular/core";
import { AuthService } from './services/auth/auth.service';
import { AuthState } from './state/auth.state';
import { User } from './models/user.model';
import { Observable } from 'rxjs';


@Injectable()
export class AuthFacade {
  public constructor(
    private readonly authService: AuthService,
    private readonly authState: AuthState,
  ) { }

  public signIn(username: string, password: string): void {
    this.authState.setIsProcessing(true);
    this.authState.setSignInErrors([]);

    this.authService
      .signIn(username, password)
      .subscribe(
        (user) => {
          console.log('User logged in!', user);
          this.authState.setIsProcessing(false);
          this.authState.setUser(user);
        },
        (error) => {
          this.authState.setSignInErrors([error]);
          this.authState.setIsProcessing(false);
        }
      );
  }

  public signOut(): void {
    this.authState.setIsProcessing(true);
    this.authService
      .signOut()
      .subscribe(() => {
        this.authState.setIsProcessing(false);
        this.authState.setUser(null);
      });
  }

  public isProcessing$(): Observable<boolean> {
    return this.authState.isProcessing$();
  }

  public getUser$(): Observable<User> {
    return this.authState.getUser$();
  }

  public getSignInErrors$(): Observable<string[]> {
    return this.authState.getSignInErrors$();
  }
}
