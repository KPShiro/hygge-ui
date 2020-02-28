import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { Observable } from 'rxjs';
import { User } from '@modules/auth/models/user.model';
import { SharedFacade } from '@modules/shared/shared.facade';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isProcessing$!: Observable<boolean>;
  public user$!: Observable<User>;

  constructor(
    private readonly sharedFacade: SharedFacade,
    private readonly authFacade: AuthFacade,
  ) { }

  ngOnInit() {
    this.isProcessing$ = this.sharedFacade.isProcessing$;
    this.user$ = this.authFacade.getUser$();

    this.authFacade.getUserData();
  }

  public signOut(): void {
    this.authFacade.signOut();
  }

}
