import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { GlobalService } from 'src/app/services/global/global.service';
declare var $: any;

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(public navigationService: NavigationService,
    public globalService: GlobalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.chargeImport();
    }, 5);
  }

  private chargeImport() {
    var url = "../../../../assets/js/side-menu.min.js";
    $.getScript(url, function () { });
  }
}
