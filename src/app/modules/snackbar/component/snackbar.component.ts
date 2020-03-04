import { Component, Input, Inject, Output, EventEmitter, ElementRef } from '@angular/core';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {

  @Input() public message!: string;
  @Output() public onClose: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(SNACKBAR_CONFIG) public readonly config: SnackbarConfig,
  ) { }

  public animationDone(event: AnimationEvent): void {
    if (event.animationName === 'snackbarIn') {
      console.log('snackbarIn', 'Animation done!');
    }

    if (event.animationName === 'snackbarOut') {
      console.log('snackbarOut', 'Animation done!');
      this.onClose.emit();
    }
  }

}
