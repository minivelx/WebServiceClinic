import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {

  public columns: string[];
  public data: any[];
  public attributes: string[];
  public title: string;
  public dataTypes: any[];

  constructor() { }

  ngOnInit() {
  }
  
}
