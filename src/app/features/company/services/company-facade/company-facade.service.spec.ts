import { TestBed } from '@angular/core/testing';
import { CompanyFacadeService } from './company-facade.service';


describe('CompanyFacadeService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            CompanyFacadeService,
        ],
    }));

    it('should be created', () => {
        const service: CompanyFacadeService = TestBed.get(CompanyFacadeService);
        expect(service).toBeTruthy();
    });
});
