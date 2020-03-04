import { Injectable } from '@angular/core';
import { SharedState } from './state/shared.state';
import { Observable } from 'rxjs';


@Injectable()
export class SharedFacade {
  public constructor(
    private readonly sharedState: SharedState,
  ) { }

  public get isProcessing$(): Observable<boolean> {
    return this.sharedState.getIsProcessing$();
  }

  public setIsProcessing(isProcessing: boolean): void {
    this.sharedState.setIsProcessing(isProcessing);
  }
}
