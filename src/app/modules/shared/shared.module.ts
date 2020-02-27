import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFacade } from './shared.facade';
import { SharedState } from './state/shared.state';


@NgModule({
  providers: [
    SharedState,
    SharedFacade,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule { }
