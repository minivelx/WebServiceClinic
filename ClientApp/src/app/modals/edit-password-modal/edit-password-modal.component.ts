import { Component, OnInit, ViewChild } from '@angular/core';
import { EditPasswordFormComponent } from 'src/app/pages/administration/users-accounts/edit-password-form/edit-password-form.component';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss']
})
export class EditPasswordModalComponent implements OnInit {

  @ViewChild(EditPasswordFormComponent, {static: false}) childComponent;
  public userInfo: CUserInfo;

  constructor() { }

  ngOnInit() {
  }

  public submitChild() {
    return this.childComponent.submit();
  }
}
