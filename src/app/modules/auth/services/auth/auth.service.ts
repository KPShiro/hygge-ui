import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Token } from '../../models/token.model';
import { isNullOrUndefined } from 'util';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {

  private readonly TEST_DELAY: number = 700;

  private readonly TEST_USER: User = {
    firstName: 'User',
    lastName: 'Test',
    email: 'user@app.com',
  };

  public constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public signIn(username: string, password: string): Observable<Token> {
    const url = `${environment.api.auth.url}${environment.api.auth.endpoints.login}`;

    return this.httpClient.post<Token>(url, { body: { username, password } }).pipe(
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
