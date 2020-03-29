import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFacadeService } from '@features/user/services/user-facade/user-facade.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserApiService } from '@features/user/services/user-api/user-api.service';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';


describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    const activatedRouteMock = {
        snapshot: {
            data: {
                invitationDetails: {
                    email: 'email@company.com',
                },
            },
        },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            imports: [
                StoreModule.forRoot({}),
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
            ],
            providers: [
                provideMockStore({}),
                UserFacadeService,
                UserApiService,
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
