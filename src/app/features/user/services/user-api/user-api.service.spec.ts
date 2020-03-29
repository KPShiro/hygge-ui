import { TestBed } from '@angular/core/testing';
import { UserApiService } from './user-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UserApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            UserApiService,
        ],
    }));

    it('should be created', () => {
        const service: UserApiService = TestBed.get(UserApiService);
        expect(service).toBeTruthy();
    });
});
