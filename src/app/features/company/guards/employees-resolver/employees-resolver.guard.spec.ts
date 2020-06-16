import { TestBed, inject } from '@angular/core/testing';
import { EmployeesResolver } from './employees-resolver.guard';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('EmployeesResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                EmployeesResolver,
                CompanyApiService,
            ]
        });
    });

    it('should ...', inject([EmployeesResolver], (guard: EmployeesResolver) => {
        expect(guard).toBeTruthy();
    }));
});
