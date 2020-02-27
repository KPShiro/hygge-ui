import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class SharedState {
  private readonly _isProcessing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setIsProcessing(isProcessing: boolean): void {
    this._isProcessing.next(isProcessing);
  }

  public getIsProcessing$(): Observable<boolean> {
    return this._isProcessing.asObservable();
  }
}
