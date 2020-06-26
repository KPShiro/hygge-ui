import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './container/user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
  ]
})
export class UserProfileModule { }
