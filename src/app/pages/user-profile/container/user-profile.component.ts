import { Component } from '@angular/core';
import { UserFacadeService } from '@features/user/services/user-facade/user-facade.service';


@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public constructor(
    private readonly _userFacade: UserFacadeService,
  ) { }

  public linkWithSocialMedia(): void {
    this._userFacade.addSocialAccountLink().subscribe((response) => console.log(response));
  }
}
