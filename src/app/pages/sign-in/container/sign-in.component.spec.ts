import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { TranslateModule } from '@ngx-translate/core';

class AuthFacadeServiceMock { }

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignInComponent],
            imports: [
                TranslateModule.forRoot(),
                ReactiveFormsModule,
            ],
            providers: [
                {
                    provide: AuthFacadeService,
                    useClass: AuthFacadeServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
