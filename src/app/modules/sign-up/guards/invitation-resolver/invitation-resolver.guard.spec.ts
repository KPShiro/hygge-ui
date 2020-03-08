import { TestBed, inject } from '@angular/core/testing';
import { InvitationResolverGuard } from './invitation-resolver.guard';


describe('InvitationResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationResolverGuard]
    });
  });

  it('should ...', inject([InvitationResolverGuard], (guard: InvitationResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
