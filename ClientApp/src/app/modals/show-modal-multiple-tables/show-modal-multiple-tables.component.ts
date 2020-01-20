import { Component, OnInit, AfterViewChecked } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-show-modal-multiple-tables',
  templateUrl: './show-modal-multiple-tables.component.html',
  styleUrls: ['./show-modal-multiple-tables.component.scss']
})
export class ShowModalMultipleTablesComponent implements OnInit, AfterViewChecked {

  public subtitle: string;
  public columns: string[];
  public data: any[];
  public attributes: string[];
  public title: string;
  public dataTypes: any[];
  public footer: boolean;
  public columnsFooter: string[];

  public subtitle2: string;
  public columns2: string[];
  public data2: any[];
  public attributes2: string[];
  public dataTypes2: any[];
  public footer2: boolean;
  public columnsFooter2: string[];
  public total: boolean;
  public text: string;
  public val: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.inputMaskInit();
  }

  //Inicializa el inputMask para el formato de moneda
  public inputMaskInit() {
    $(".currency").inputmask("currency", { radixPoint: ',', autounmask: true, rightAlign: false });
  }
}
