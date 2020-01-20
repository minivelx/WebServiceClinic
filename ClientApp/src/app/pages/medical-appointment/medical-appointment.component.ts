import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { GlobalService } from 'src/app/services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { MedicalAppointmentModalComponent } from 'src/app/modals/medical-appointment-modal/medical-appointment-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CMedicalAppointment } from 'src/app/classes/cMedicalAppointment/cMedicalAppointment';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.component.html',
  styleUrls: ['./medical-appointment.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition('void => *', useAnimation(fadeIn, {
        params: {
          time: '1s'
        }
      }))
    ])
  ]
})
export class MedicalAppointmentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public lstMedicalAppointments: CMedicalAppointment[];
  public subscriptions: Subscription[];

  constructor(private globalService: GlobalService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService) {
    this.lstMedicalAppointments = [];
    this.subscriptions = [];
    this.dtOptions = {
      retrieve: true,
      dom: 'lfrtip',
      columns: [
        null,
        null,
        { className: "text-center", orderable: false }
      ],
      autoWidth: true,
      language: this.globalService.lenguajeDataTable,
      scrollX: true,
      proccessing: true
    };
  }

  ngOnInit() {
    this.listAppointments();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  updateTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  public listAppointments() {
    this.globalService.get(this.globalUrlsService.urlMedicalAppointment).then((res: any) => {
      if (res.success) {
        this.lstMedicalAppointments = res.message;
        this.updateTable();
      } else {
        this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
      }
    }, (err) => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public openModal() {
    this.modalService.show(MedicalAppointmentModalComponent, { keyboard: false, ignoreBackdropClick: true });
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        if (reason === "true") {
          this.listAppointments();
          this.unsubscribe();
        }
      })
    );
  }

  public deleteMedicalAppointment(cMedicalAppointment: CMedicalAppointment) {
    let toast = this.toastr.info("¿Está seguro de cancelar la cita?", "", {
      closeButton: true
    })
    toast.onAction.subscribe(() => {
      this.globalService.delete(this.globalUrlsService.urlMedicalAppointment, cMedicalAppointment.id.toString()).then((res: any) => {
        if (res.success) {
          this.listAppointments();
          this.toastr.success(res.message, "", { timeOut: res.message.length * 100 });
        } else {
          this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
        }
      }, (err) => {
        this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
      });
    })
  }

  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
