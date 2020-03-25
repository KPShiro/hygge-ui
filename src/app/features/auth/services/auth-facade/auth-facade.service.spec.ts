import { TestBed } from '@angular/core/testing';
import { AuthFacadeService } from './auth-facade.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAuthState, DEFAULT_AUTH_STATE } from '@features/auth/state/auth.state';
import { Store } from '@ngrx/store';

import * as actions from '../../state/auth.actions';


describe('AuthFacadeService', () => {
    let authFacadeService: AuthFacadeService;
    let store: MockStore<IAuthState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthFacadeService,
                provideMockStore({
                    initialState: DEFAULT_AUTH_STATE,
                }),
            ]
        });

        authFacadeService = TestBed.get(AuthFacadeService);
        store = TestBed.get(Store);
    });

    it('should be created', () => {
        expect(authFacadeService).toBeTruthy();
    });

    afterEach(() => {
        store.setState({
            ...DEFAULT_AUTH_STATE,
        });
    });

    describe('signInWithUsernameAndPassword()', () => {
        it('should dispatch sign in action', () => {
            authFacadeService.signInWithUsernameAndPassword('user@email.com', 'password');

            store.scannedActions$.subscribe((action) => {
                expect(action.type).toBe(actions.signIn.type);
            });
        });
    });

    describe('signOut()', () => {
        it('should dispatch sign out action', () => {
            authFacadeService.signOut();

            store.scannedActions$.subscribe((action) => {
                expect(action.type).toBe(actions.signOut.type);
            });
        });
    });
});
