import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNavbarComponent } from './main-navbar.component';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';


class AuthFacadeServiceMock {
    public signOut(): void { return; }
}

describe('MainNavbarComponent', () => {
    let component: MainNavbarComponent;
    let fixture: ComponentFixture<MainNavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MainNavbarComponent,
            ],
            providers: [
                {
                    provide: AuthFacadeService,
                    useClass: AuthFacadeServiceMock,
                }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
