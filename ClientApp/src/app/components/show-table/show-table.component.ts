import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() columns: string[];
  @Input() data: any[];
  @Input() attributes: any[];
  @Input() dataTypes: any[];
  @Input() footer: boolean;
  @Input() columnsFooter: string[];

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private globalService: GlobalService) {
    this.dtOptions = {
      retrieve: true,
      dom: 'lfrtip',
      autoWidth: true,
      language: this.globalService.lenguajeDataTable,
      scrollX: true,
      paging: true
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

  public proccessData(item, index) {
    switch (this.dataTypes[index]) {
      case "Currency": return formatCurrency(item, 'en-US', '$');
      default: return item;
    }
  }
}
