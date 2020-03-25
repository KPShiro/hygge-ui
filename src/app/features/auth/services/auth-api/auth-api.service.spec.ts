import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { IToken } from '@features/auth/interfaces/token.interface';


describe('AuthApiService', () => {
    let authApiService: AuthApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                AuthApiService,
            ]
        });

        authApiService = TestBed.get(AuthApiService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(authApiService).toBeTruthy();
        expect(httpTestingController).toBeTruthy();
    });

    describe('signInWithUsernameAndPassword()', () => {
        const mockedUser = {
            username: 'USERNAME@EMAIL.COM',
            password: 'PASSWORD',
        };

        const mockedToken: IToken = {
            accessToken: 'ACCESS_TOKEN',
            refreshToken: 'REFRESH_TOKEN',
        };

        it('should call POST', () => {
            authApiService.signInWithUsernameAndPassword(mockedUser.username, mockedUser.password).subscribe((token) => {
                expect(token.accessToken).toBe(mockedToken.accessToken);
                expect(token.refreshToken).toBe(mockedToken.refreshToken);
            });

            const req = httpTestingController.expectOne(`${environment.api.auth.url}${environment.api.auth.endpoints.login}`);
            expect(req.request.method).toBe('POST');
            req.flush(mockedToken);
        });
    });

    describe('signOut()', () => {
        it('should call GET', () => {
            authApiService.signOut().subscribe();

            const req = httpTestingController.expectOne(`${environment.api.auth.url}${environment.api.auth.endpoints.logout}`);
            expect(req.request.method).toBe('GET');
        });
    });
});
