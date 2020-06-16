import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';


@Injectable()
export class EmployeesResolver implements Resolve<any> {
    public constructor(
        private readonly _companyApi: CompanyApiService,
    ) { }

    public resolve(): Observable<any[]> {
        return this._companyApi.getEmployees();
    }
}
