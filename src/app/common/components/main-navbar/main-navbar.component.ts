import { Component } from '@angular/core';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';


@Component({
    selector: 'app-main-navbar',
    templateUrl: './main-navbar.component.html',
    styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {

    public constructor(
        private readonly _authFacade: AuthFacadeService,
    ) { }


    public signOut(): void {
        this._authFacade.signOut();
    }

}
