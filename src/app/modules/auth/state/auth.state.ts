import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable()
export class AuthState {
  private readonly _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private readonly _isProcessing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private readonly _signInErrors: BehaviorSubject<string[]> = new BehaviorSubject([]);

  public isProcessing$(): Observable<boolean> {
    return this._isProcessing.asObservable();
  }

  public getUser$(): Observable<User> {
    return this._user.asObservable();
  }

  public getSignInErrors$(): Observable<string[]> {
    return this._signInErrors.asObservable();
  }

  public setIsProcessing(value: boolean): void {
    this._isProcessing.next(value);
  }

  public setUser(user: User): void {
    this._user.next(user);
  }

  public setSignInErrors(errors: string[]): void {
    this._signInErrors.next(errors);
  }
}
