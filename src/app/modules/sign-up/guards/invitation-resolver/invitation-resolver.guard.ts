import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvitationResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return of({
      email: 'dev_1@test.com',
      companyName: 'Test',
    });
  }
}
