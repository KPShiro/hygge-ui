import { TestBed, inject } from '@angular/core/testing';
import { VerifyInvitationGuard } from './verify-invitation.guard';
import { RouterTestingModule } from '@angular/router/testing';


describe('VerifyInvitationGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VerifyInvitationGuard],
            imports: [
                RouterTestingModule,
            ],
        });
    });

    it('should ...', inject([VerifyInvitationGuard], (guard: VerifyInvitationGuard) => {
        expect(guard).toBeTruthy();
    }));
});
