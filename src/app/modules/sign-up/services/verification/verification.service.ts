import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class VerificationService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public verifyUsername(username: string): Observable<boolean> {
    const url = `${environment.api.verify.url}${environment.api.verify.endpoints.username}`;

    return this.httpClient.post<boolean>(url, { username });
  }

  public verifyCompanyName(companyName: string): Observable<boolean> {
    const url = `${environment.api.verify.url}${environment.api.verify.endpoints.companyName}`;

    return this.httpClient.post<boolean>(url, { name: companyName });
  }

  public verifyInvitation(id: string): Observable<boolean> {
    const url = `${environment.api.verify.url}${environment.api.verify.endpoints.invitation}`;

    return this.httpClient.post<boolean>(url, { id });
  }
}
