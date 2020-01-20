import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss'],
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
export class NavbarLeftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
