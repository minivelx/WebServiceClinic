import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';

@Component({
  selector: 'app-user-account-form',
  templateUrl: './user-account-form.component.html',
  styleUrls: ['./user-account-form.component.scss']
})
export class UserAccountFormComponent implements OnInit {

  public formUser: FormGroup;
  @Input() userInfo: CUserInfo;
  @Input() isEdit: boolean;
  public isNew: boolean;
  public isSubmitted: boolean;
  public subscriptions: Subscription[];
  public confirmPassword: string;

  constructor(private toastr: ToastrService,
    private modalService: BsModalService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public globalService: GlobalService,
    public globalUrlsService: GlobalUrlsService,
    public bsModalRef: BsModalRef) {
    this.isNew = false;
    this.isSubmitted = false;
    this.subscriptions = [];
    this.confirmPassword = "";
  }

  ngOnInit() {
    if (this.userInfo === undefined) {
      this.userInfo = new CUserInfo();
      this.isNew = true;
    } else {
      
    }
    this.formUser = this.formBuilder.group({
      login: [this.userInfo.login, [Validators.required, Validators.maxLength(100)]],
      email: [this.userInfo.email, [Validators.maxLength(50), Validators.email]],
      name: [this.userInfo.name, [Validators.required, Validators.maxLength(100)]],
      password: [this.userInfo.password, Validators.minLength(6)],

    });
    this.setValidatorsPassword();
  }

  public setValidatorsPassword() {
    if (this.userInfo.password !== null) {
      this.formUser.controls['password'].setValidators([Validators.required]);2
    } else {
      this.userInfo.password = "";
    }
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formUser.invalid) {
      let dataForm = this.formUser.value;
      let userInfo: CUserInfo = dataForm as CUserInfo;
      if (userInfo.password === null) {
        userInfo.password = "";
      }
      if (userInfo.password !== this.confirmPassword) {
        var msg = "La contraseña y la confirmación no coinciden";
        this.toastr.info(msg, "", { timeOut: msg.length * 100 });
      } else {
        this.spinnerService.show();
        if (this.isNew) {
          userInfo.active = true;
          this.addUser(userInfo);
        }
        else {
          userInfo.id = this.userInfo.id;
          userInfo.active = this.userInfo.active;
          this.editUser(userInfo);
        }
      }
    }
  }

  public addUser(userInfo: CUserInfo) {
    this.globalService.post(this.globalUrlsService.urlCreateUser, userInfo).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        this.modalService.setDismissReason("true");
        this.bsModalRef.hide();
        this.toastr.success(result.message, "", { timeOut: result.message.length * 100 });
      } else {
        this.toastr.error(result.message, "", { timeOut: result.message.length * 100 });
      }
    }).catch((err: any) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public editUser(userInfo: CUserInfo) {
    this.globalService.put(this.globalUrlsService.urlEditUser, userInfo, userInfo.id).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        this.modalService.setDismissReason("true");
        this.bsModalRef.hide();
        this.toastr.success(result.message, "", { timeOut: result.message.length * 100 });
      } else {
        this.toastr.error(result.message, "", { timeOut: result.message.length * 100 });
      }
    }).catch((err: any) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  
}
