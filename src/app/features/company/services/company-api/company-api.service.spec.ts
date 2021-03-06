import { TestBed } from '@angular/core/testing';
import { CompanyApiService } from './company-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CompanyApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            CompanyApiService,
        ],
    }));

    it('should be created', () => {
        const service: CompanyApiService = TestBed.get(CompanyApiService);
        expect(service).toBeTruthy();
    });
});
