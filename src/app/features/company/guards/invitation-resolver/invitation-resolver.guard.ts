import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class InvitationResolver implements Resolve<any> {
    public resolve(): Observable<any> {
        return of({
            userEmail: 'user@app.com',
            companyId: '0000-0000-0000-0001',
        });
    }
}
