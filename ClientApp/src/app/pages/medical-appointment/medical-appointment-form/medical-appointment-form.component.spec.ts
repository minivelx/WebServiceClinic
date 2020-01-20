import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAppointmentFormComponent } from './medical-appointment-form.component';

describe('MedicalAppointmentFormComponent', () => {
  let component: MedicalAppointmentFormComponent;
  let fixture: ComponentFixture<MedicalAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAppointmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
