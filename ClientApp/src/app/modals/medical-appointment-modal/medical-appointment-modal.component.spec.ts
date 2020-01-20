import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAppointmentModalComponent } from './medical-appointment-modal.component';

describe('MedicalAppointmentModalComponent', () => {
  let component: MedicalAppointmentModalComponent;
  let fixture: ComponentFixture<MedicalAppointmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAppointmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
