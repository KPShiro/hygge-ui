import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Token } from '../../models/token.model';
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
    const url: string = `${environment.api.auth.url}${environment.api.auth.endpoints.login}`;

    return this.httpClient.post<Token>(url, { username, password });
  }

  public getUserData(): Observable<User> {
    return of(this.TEST_USER).pipe(
      catchError((error) => throwError(error)),
      delay(this.TEST_DELAY),
    );
  }

  public signOut(): Observable<any> {
    const url: string = `${environment.api.auth.url}${environment.api.auth.endpoints.logout}`;

    return this.httpClient.get(url);
  }
}
