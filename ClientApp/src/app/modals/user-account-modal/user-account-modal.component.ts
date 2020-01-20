import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountFormComponent } from 'src/app/pages/administration/users-accounts/user-account-form/user-account-form.component';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';

@Component({
  selector: 'app-user-account-modal',
  templateUrl: './user-account-modal.component.html',
  styleUrls: ['./user-account-modal.component.scss']
})
export class UserAccountModalComponent implements OnInit {

  @ViewChild(UserAccountFormComponent, {static: false}) childComponent;
  public userInfo: CUserInfo;
  public isEdit: boolean;
  public showButtons: boolean;

  constructor() {
    if (this.showButtons === undefined) {
      this.showButtons = true;
    }
  }

  ngOnInit() {
  }

  public submitChild() {
    return this.childComponent.submit();
  }
}
