import { TestBed } from '@angular/core/testing';
import { UserFacadeService } from './user-facade.service';
import { UserApiService } from '../user-api/user-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';


describe('UserFacadeService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({}),
        ],
        providers: [
            UserFacadeService,
            UserApiService,
        ]
    }));

    it('should be created', () => {
        const service: UserFacadeService = TestBed.get(UserFacadeService);
        expect(service).toBeTruthy();
    });
});
