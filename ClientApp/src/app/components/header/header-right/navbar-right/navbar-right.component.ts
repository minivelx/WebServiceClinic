import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInDown } from 'src/app/animations/fade-in-down.animation';
import { fadeOutUp } from 'src/app/animations/fade-out-up.animation';
import { fadeIn } from 'src/app/animations/fade-in.animation';
import { GlobalService } from 'src/app/services/global/global.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss'],
  animations: [
    trigger('fadeVerticalAnimation', [
      transition('void => *', useAnimation(fadeInDown, {
        params: {
          time: '400ms'
        }
      })),
      transition('* => void', useAnimation(fadeOutUp, {
        params: {
          time: '400ms'
        }
      }))
    ]),
    trigger('fadeInAnimation', [
      transition('void => *', useAnimation(fadeIn, {
        params: {
          time: '1s'
        }
      }))
    ])
  ]
})

export class NavbarRightComponent implements OnInit {

  public state: boolean;
  public subscriptions: Subscription[];

  constructor(public globalService: GlobalService,
    public modalService: BsModalService,
    public navigationService: NavigationService) {
    this.state = false;
    this.subscriptions = [];
  }

  ngOnInit() {
  }

  public closeSession() {
    localStorage.clear();
    this.globalService.setTokenHeader("");
    this.globalService.roles = [];
    this.globalService.currentUser = "";
    this.navigationService.loginPage();
  }
}
