import { Component, Input, Inject, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SNACKBAR_CONFIG, ISnackbarConfig } from '../snackbar.config';
import { SnackbarType } from '../enums/snackbar-type.enum';


@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {

    @Input() public message!: string;
    @Input() public type: SnackbarType = SnackbarType.INFO;

    @Output() public afterOpening: EventEmitter<void> = new EventEmitter();
    @Output() public afterClosing: EventEmitter<void> = new EventEmitter();

    @ViewChild('snackbar') public snackbar: ElementRef;

    public constructor(
        @Inject(SNACKBAR_CONFIG) public readonly config: ISnackbarConfig,
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
        const snackbar = this.snackbar.nativeElement;
        snackbar.style.animation = 'snackbarOut 0.3s';
    }

    public getSnackbarTypeClass(): string {
        return `type-${this.type}`;
    }
}
