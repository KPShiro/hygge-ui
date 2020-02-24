import { TestBed } from '@angular/core/testing';
import { AuthState } from './auth.state';


describe('AuthState', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthState = TestBed.get(AuthState);
    expect(service).toBeTruthy();
  });
});
