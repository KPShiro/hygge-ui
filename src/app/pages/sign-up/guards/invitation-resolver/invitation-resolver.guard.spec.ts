import { TestBed, inject } from '@angular/core/testing';
import { InvitationResolver } from './invitation-resolver.guard';


describe('InvitationResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InvitationResolver]
        });
    });

    it('should ...', inject([InvitationResolver], (guard: InvitationResolver) => {
        expect(guard).toBeTruthy();
    }));
});
