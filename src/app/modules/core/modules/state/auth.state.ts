import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthState {
  private readonly _user: BehaviorSubject<any> = new BehaviorSubject(null);

  public getUser$(): Observable<any> {
    return this._user.asObservable();
  }

  public setUser(user: any): void {
    this._user.next(user);
  }
}
