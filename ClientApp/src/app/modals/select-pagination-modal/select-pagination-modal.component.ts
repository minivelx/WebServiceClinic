import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-pagination-modal',
  templateUrl: './select-pagination-modal.component.html',
  styleUrls: ['./select-pagination-modal.component.scss']
})
export class SelectPaginationModalComponent implements OnInit {

  public columns: string[];
  public data: any[];
  public attributes: string[];
  public title: string;
  public dataTypes: any[];
  public totalItems: number;
  public urlPeticion: string;

  constructor() { }

  ngOnInit() {
  }

}
