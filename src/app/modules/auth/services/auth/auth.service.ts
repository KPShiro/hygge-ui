import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Token } from '../../models/token.model';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthService {

  private readonly TEST_DELAY: number = 700;

  private readonly TEST_USER: User = {
    firstName: 'User',
    lastName: 'Test',
    email: 'user@app.com',
  };

  private readonly TEST_TOKEN: Token = {
    accessToken: 'TEST_ACCESS_TOKEN',
    refreshToken: 'TEST_REFRESH_TOKEN',
  };

  public constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public signIn(username: string, password: string): Observable<Token> {
    let token: Token | null = null;

    if (username === this.TEST_USER.email && password === 'test') {
      token = this.TEST_TOKEN;
    }

    return of(token).pipe(
      catchError((error) => throwError(error)),
      delay(this.TEST_DELAY),
      map((token) => {
        if (isNullOrUndefined(token)) {
          throw new Error('Combination of username and password is not valid');
        }

        return token;
      }),
    );
  }

  public getUserData(): Observable<User> {
    return of(this.TEST_USER).pipe(
      catchError((error) => throwError(error)),
      delay(this.TEST_DELAY),
    );
  }

  public signOut(): Observable<any> {
    return of(null).pipe(
      delay(this.TEST_DELAY),
    );
  }
}
