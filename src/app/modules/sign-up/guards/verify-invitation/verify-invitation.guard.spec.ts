import { TestBed, async, inject } from '@angular/core/testing';

import { VerifyInvitationGuard } from './verify-invitation.guard';

describe('VerifyInvitationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyInvitationGuard]
    });
  });

  it('should ...', inject([VerifyInvitationGuard], (guard: VerifyInvitationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
