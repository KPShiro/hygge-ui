import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthState {
  private readonly _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private readonly _token: BehaviorSubject<Token> = new BehaviorSubject(null);
  private readonly _signInErrors: BehaviorSubject<string[]> = new BehaviorSubject([]);

  public constructor() {
    this.readFromCache('token', this.setToken.bind(this));
  }

  public getUser$(): Observable<User> {
    return this._user.asObservable();
  }

  public getToken$(): Observable<Token> {
    return this._token.asObservable();
  }

  public getSignInErrors$(): Observable<string[]> {
    return this._signInErrors.asObservable();
  }

  public setUser(user: User): void {
    this._user.next(user);
  }

  public setToken(token: Token): void {
    this.cacheValue('token', token);
    this._token.next(token);
  }

  public setSignInErrors(errors: string[]): void {
    this._signInErrors.next(errors);
  }

  private cacheValue(key: string, value: any): void {
    if (isNullOrUndefined(value)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private readFromCache(key: string, setCallback: (...args: any[]) => any): void {
    const tmpValue = localStorage.getItem(key);
    if (!isNullOrUndefined(tmpValue)) {
      setCallback(JSON.parse(tmpValue));
    }
  }
}
