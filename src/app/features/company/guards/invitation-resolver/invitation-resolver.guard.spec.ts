import { TestBed, inject } from '@angular/core/testing';
import { InvitationResolver } from './invitation-resolver.guard';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('InvitationResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                InvitationResolver,
                CompanyApiService,
            ]
        });
    });

    it('should ...', inject([InvitationResolver], (guard: InvitationResolver) => {
        expect(guard).toBeTruthy();
    }));
});
