import { Component, Input, Inject, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {

  @Input() public message!: string;

  @Output() public afterOpening: EventEmitter<void> = new EventEmitter();
  @Output() public afterClosing: EventEmitter<void> = new EventEmitter();

  @ViewChild('snackbarWrapper', { static: false }) public snackbarWrapper: ElementRef;

  constructor(
    @Inject(SNACKBAR_CONFIG) public readonly config: SnackbarConfig,
  ) { }

  public animationDone(event: AnimationEvent): void {
    if (event.animationName === 'snackbarIn') {
      this.afterOpening.emit();
    }

    if (event.animationName === 'snackbarOut') {
      this.afterClosing.emit();
    }
  }

  public close(): void {
    const snackbar = this.snackbarWrapper.nativeElement;
    snackbar.style.animation = 'snackbarOut 0.3s';
  }
}
