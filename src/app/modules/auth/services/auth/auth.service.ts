import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthService {

  private readonly TEST_DELAY: number = 1000;
  private readonly TEST_USER: User = {
    firstName: 'User',
    lastName: 'Test',
    email: 'user@app.com',
  };

  public constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public signIn(username: string, password: string): Observable<User> {
    let user: User | null = null;

    if (username === this.TEST_USER.email && password === 'test') {
      user = this.TEST_USER;
    }

    return of(user).pipe(
      delay(this.TEST_DELAY),
      switchMap((user) => {
        if (isNullOrUndefined(user)) {
          return throwError('Combination of username and password is not valid');
        }

        return of(user);
      }),
    );
  }

  public signOut(): Observable<any> {
    return of(null).pipe(
      delay(this.TEST_DELAY),
    );
  }
}
