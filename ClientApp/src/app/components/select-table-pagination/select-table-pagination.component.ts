import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { formatDate, formatCurrency } from '@angular/common';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { fade } from 'src/app/animations/fade';

@Component({
  selector: 'app-select-table-pagination',
  templateUrl: './select-table-pagination.component.html',
  styleUrls: ['./select-table-pagination.component.scss'],
  animations: [ 
    fade
  ]
})
export class SelectTablePaginationComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() columns: string[];
  @Input() data: any[];
  @Input() attributes: any[];
  @Input() dataTypes: any[];
  @Input() totalItems: number;
  @Input() urlPeticion: string;
  public currentPage: number;
  public totalPorPagina: number;
  public filtro: string;

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private toastr: ToastrService,
    private globalService: GlobalService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef) {
    this.currentPage = 1;
    this.totalPorPagina = 10;
    this.filtro = "";
    this.dtOptions = {
      retrieve: true,
      dom: 'lrtip',
      autoWidth: true,
      language: this.globalService.lenguajeDataTable,
      scrollX: true,
      paging: false,
      columnDefs: [
        { orderable: false, targets: -1, className: "text-center" }
      ]
    };
  }

  ngOnInit() {
    var startPage = 1;
    var url = this.urlPeticion + startPage + "/" + this.totalPorPagina + "/" + this.filtro;
    this.globalService.get(url).then((res: any) => {
      this.data = res.message;
      this.actualizarTabla();
    }).catch(err => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  pageChanged(event: PageChangedEvent): void {
    var url = this.urlPeticion + "/" + event.page + "/" + this.totalPorPagina + "/" + this.filtro;
    this.globalService.get(url).then((res: any) => {
      this.data = res.message;
      this.actualizarTabla();
    }).catch(err => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  actualizarTabla() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  public selectItem(item) {
    this.modalService.setDismissReason(item);
    this.bsModalRef.hide();
  }

  public proccessData(item, index) {
    switch (this.dataTypes[index]) {
      case "Date": return formatDate(item, "dd/MM/yyyy", 'en-US');
      case "Currency": return formatCurrency(item, "en-US", "$");
      default: return item;
    }
  }

  public consultar() {
    var startPage = 1;
    var url = this.urlPeticion + "/" + startPage + "/" + this.totalPorPagina + "/" + this.filtro;
    this.globalService.get(url).then((res: any) => {
      this.data = res.message;
      this.totalItems = res.total;
      this.actualizarTabla();
    }).catch(err => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }
}
