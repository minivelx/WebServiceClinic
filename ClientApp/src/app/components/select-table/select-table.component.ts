import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { formatDate, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.scss']
})
export class SelectTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() columns: string[];
  @Input() data: any[];
  @Input() attributes: any[];
  @Input() dataTypes: any[];

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private globalService: GlobalService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef) {
    this.dtOptions = {
      retrieve: true,
      dom: 'lfrtip',
      autoWidth: true,
      language: this.globalService.lenguajeDataTable,
      scrollX: true,
      paging: true,
      columnDefs: [
        { orderable: false, targets: -1 }
      ]
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public selectItem(item) {
    this.modalService.setDismissReason(item);
    this.bsModalRef.hide();
  }
  
  public proccessData(item, index) {
    switch (this.dataTypes[index]) {
      case "Date": return formatDate(item, "dd/MM/yyyy", 'en-US');
      case "Currency": return formatCurrency(item, "en-US", "$");
      case "Percent": return item * 100 + " %";
      case "Boolean": return item ? 'Si' : 'No';
      default: return item;
    }
  }
}