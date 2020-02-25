import { Component, OnInit } from '@angular/core';
import { AuthReducer } from '@modules/auth/auth.reducer';
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
    private readonly authReducer: AuthReducer,
  ) { }

  ngOnInit() {
    this.isProcessing$ = this.authReducer.isProcessing$();
    this.user$ = this.authReducer.getUser$();

    this.authReducer.getUserData();
  }

  public signOut(): void {
    this.authReducer.signOut();
  }

}
