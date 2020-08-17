import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateInvitationModalComponent } from './create-invitation-modal.component';


describe('CreateInvitationModalComponent', () => {
  let component: CreateInvitationModalComponent;
  let fixture: ComponentFixture<CreateInvitationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInvitationModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
