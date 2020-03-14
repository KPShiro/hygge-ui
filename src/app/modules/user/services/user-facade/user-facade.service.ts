import * as actions from '../../state/user.actions';
import * as selectors from '../../state/user.selectors';

import { Injectable } from '@angular/core';
import { IUserState } from '@modules/user/interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { UserApi } from '../user-api/user-api.service';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IToken } from '@modules/user/interfaces/token.interface';
import { Observable } from 'rxjs';
import { IUserData } from '@modules/user/interfaces/user-data.interface';
import { ICreateUserDto } from '@modules/user/interfaces/create-user-dto.interface';
import { isNullOrUndefined } from 'util';


@Injectable()
export class UserFacade {

  private readonly LOCAL_STORAGE_TOKEN_KEY = 'token';
  private readonly LOCAL_STORAGE_USER_DATA_KEY = 'userData';

  constructor(
    private readonly _userStore: Store<IUserState>,
    private readonly _userApi: UserApi,
    private readonly _router: Router,
  ) {
    const userDataString: string | null = localStorage.getItem('userData');
    if (!isNullOrUndefined(userDataString)) {
      this._userStore.dispatch(actions.saveUserData({ payload: JSON.parse(userDataString) }));
    }
  }

  public get token(): IToken {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY));
  }

  public get userData$(): Observable<IUserData> {
    return this._userStore.select(selectors.userData);
  }

  public signInWithUsernameAndPassword(username: string, password: string): void {
    this._userApi.signInWithUsernameAndPassword(username, password)
      .pipe(
        tap((token) => this.saveTokenToLocalStorage(token)),
        map(() => this.fetchUserData()),
        tap(() => this._router.navigate(['/dashboard'])),
      ).subscribe();
  }

  public signOut(): void {
    this._userApi.signOut()
      .pipe(
        tap(() => {
          localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
          localStorage.removeItem(this.LOCAL_STORAGE_USER_DATA_KEY);
        }),
        tap(() => this._router.navigate(['/'])),
        tap(() => this._userStore.dispatch(actions.clearState())),
      ).subscribe();
  }

  public fetchUserData(): void {
    this._userApi.fetchUserData()
      .pipe(
        tap((data) => this._userStore.dispatch(actions.saveUserData({ payload: data }))),
        tap((data) => localStorage.setItem(this.LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(data))),
      ).subscribe();
  }

  public createAccount(dto: ICreateUserDto): void {
    this._userApi.createAccount(dto)
      .pipe(
        tap((token) => this.saveTokenToLocalStorage(token)),
      ).subscribe();
  }

  private saveTokenToLocalStorage(token: IToken): void {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
  }
}
