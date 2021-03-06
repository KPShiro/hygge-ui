import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';


describe('AppComponent', () => {
    let component: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
});
