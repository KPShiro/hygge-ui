import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IInvitationDetails } from '@modules/sign-up/models/invitation-details.model';


@Injectable({
  providedIn: 'root'
})
export class InvitationResolver implements Resolve<any> {
  resolve(): Observable<IInvitationDetails> {
    return of({
      userEmail: 'user@app.com',
      companyId: '0000-0000-0000-0001',
    });
  }
}
