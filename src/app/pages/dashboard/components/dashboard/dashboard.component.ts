import { Component } from '@angular/core';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public constructor(
    private readonly _authFacade: AuthFacadeService,
  ) { }

  public signOut(): void {
    this._authFacade.signOut();
  }
}
