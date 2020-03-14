import { Component } from '@angular/core';
import { UserFacade } from '@modules/user/services/user-facade/user-facade.service';
import { IUserData } from '@modules/user/interfaces/user-data.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public user$: Observable<IUserData> = this._userFacade.userData$;

  constructor(
    private readonly _userFacade: UserFacade,
  ) { }

  public signOut(): void {
    this._userFacade.signOut();
  }

}
