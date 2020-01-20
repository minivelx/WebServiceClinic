import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalAppointmentFormComponent } from 'src/app/pages/medical-appointment/medical-appointment-form/medical-appointment-form.component';

@Component({
  selector: 'app-medical-appointment-modal',
  templateUrl: './medical-appointment-modal.component.html',
  styleUrls: ['./medical-appointment-modal.component.scss']
})
export class MedicalAppointmentModalComponent implements OnInit {

  @ViewChild(MedicalAppointmentFormComponent, {static: false}) childComponent;

  constructor() { }

  ngOnInit() {
  }

  public submitChild() {
    return this.childComponent.submit();
  }
}
