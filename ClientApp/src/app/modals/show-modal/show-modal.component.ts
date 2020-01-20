import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss']
})
export class ShowModalComponent implements OnInit {

  public columns: string[];
  public data: any[];
  public dataTypes: any[];
  public attributes: string[];
  public title: string;
  public footer: boolean;
  public columnsFooter: string[];

  constructor() { }

  ngOnInit() {
  }

}
