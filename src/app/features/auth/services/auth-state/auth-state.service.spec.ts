import { TestBed } from '@angular/core/testing';
import { AuthStateService } from './auth-state.service';
import { provideMockStore } from '@ngrx/store/testing';
import { DEFAULT_AUTH_STATE } from '@features/auth/state/auth.state';


describe('AuthStateService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            AuthStateService,
            provideMockStore({
                initialState: DEFAULT_AUTH_STATE,
            }),
        ]
    }));

    it('should be created', () => {
        const service: AuthStateService = TestBed.get(AuthStateService);
        expect(service).toBeTruthy();
    });
});
