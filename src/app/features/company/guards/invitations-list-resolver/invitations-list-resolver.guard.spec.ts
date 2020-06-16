import { TestBed, inject } from '@angular/core/testing';
import { InvitationsListResolver } from './invitations-list-resolver.guard';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('InvitationsListResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                InvitationsListResolver,
                CompanyApiService,
            ]
        });
    });

    it('should ...', inject([InvitationsListResolver], (guard: InvitationsListResolver) => {
        expect(guard).toBeTruthy();
    }));
});
