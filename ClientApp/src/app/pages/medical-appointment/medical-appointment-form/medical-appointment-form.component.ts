import { Component, OnInit, Input } from '@angular/core';
import { CMedicalAppointment } from 'src/app/classes/cMedicalAppointment/cMedicalAppointment';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectModalComponent } from 'src/app/modals/select-modal/select-modal.component';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { CMedicalAppointmentType } from 'src/app/classes/cMedicalAppointment/cMedicalAppointmentType';


@Component({
  selector: 'app-medical-appointment-form',
  templateUrl: './medical-appointment-form.component.html',
  styleUrls: ['./medical-appointment-form.component.scss']
})
export class MedicalAppointmentFormComponent implements OnInit {

  public formMedicalAppointment: FormGroup;
  public cMedicalAppointment: CMedicalAppointment;
  public isSubmitted: boolean;
  public cMedicalAppointmentType: CMedicalAppointmentType;
  public subscriptions: Subscription[];
  public lstMedicalAppointmentTypes: CMedicalAppointmentType[];


  constructor(private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    public globalService: GlobalService,
    public globalUrlsService: GlobalUrlsService,
    private bsModalRef: BsModalRef) {
    this.isSubmitted = false;
    this.cMedicalAppointmentType = new CMedicalAppointmentType();
    this.subscriptions = [];
    this.lstMedicalAppointmentTypes = [];
    this.cMedicalAppointment = new CMedicalAppointment();
  }

  ngOnInit() {
    this.formMedicalAppointment = this.formBuilder.group({
      date: [this.cMedicalAppointment.date, Validators.required],
      idMedicalAppointmentType: [this.cMedicalAppointment.idMedicalAppointmentType, Validators.required]
    });
    this.listMedicalAppointmentTypes();
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formMedicalAppointment.invalid) {
      let dataForm = this.formMedicalAppointment.value;
      let cMedicalAppointment: CMedicalAppointment = dataForm as CMedicalAppointment;
      this.spinnerService.show();

      cMedicalAppointment.date = new Date(cMedicalAppointment.date.getTime() + (cMedicalAppointment.date.getTimezoneOffset() * -60 * 1000));
      cMedicalAppointment.active = true;
      this.addAppointment(cMedicalAppointment);
    }
  }

  public addAppointment(cMedicalAppointment: CMedicalAppointment) {
    this.globalService.post(this.globalUrlsService.urlMedicalAppointment, cMedicalAppointment).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        this.modalService.setDismissReason("true");
        this.bsModalRef.hide();
        this.toastr.success(result.message, "", { timeOut: result.message.length * 100 });
      } else {
        this.toastr.error(result.message, "", { timeOut: result.message.length * 100 });
      }
    }).catch((err: any) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public listMedicalAppointmentTypes() {
    this.globalService.get(this.globalUrlsService.urlMedicalAppointmentType).then((res: any) => {
      if (res.success) {
        this.lstMedicalAppointmentTypes = res.message;
      } else {
        this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
      }
    }, (err) => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
