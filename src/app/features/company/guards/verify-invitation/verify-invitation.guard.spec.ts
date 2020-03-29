import { TestBed, inject } from '@angular/core/testing';
import { VerifyInvitationGuard } from './verify-invitation.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('VerifyInvitationGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                VerifyInvitationGuard,
                CompanyApiService,
            ],
        });
    });

    it('should ...', inject([VerifyInvitationGuard], (guard: VerifyInvitationGuard) => {
        expect(guard).toBeTruthy();
    }));
});
