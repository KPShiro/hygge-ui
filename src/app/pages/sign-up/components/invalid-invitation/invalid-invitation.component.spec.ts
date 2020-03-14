import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvalidInvitationComponent } from './invalid-invitation.component';


describe('InvalidInvitationComponent', () => {
  let component: InvalidInvitationComponent;
  let fixture: ComponentFixture<InvalidInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
