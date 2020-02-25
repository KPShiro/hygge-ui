import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { Observable } from 'rxjs';
import { User } from '@modules/auth/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isProcessing$!: Observable<boolean>;
  public user$!: Observable<User>;

  constructor(
    private readonly authFacade: AuthFacade,
  ) { }

  ngOnInit() {
    this.isProcessing$ = this.authFacade.isProcessing$();
    this.user$ = this.authFacade.getUser$();

    this.authFacade.getUserData();
  }

  public signOut(): void {
    this.authFacade.signOut();
  }

}
