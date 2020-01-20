import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';

@Component({
  selector: 'app-edit-password-form',
  templateUrl: './edit-password-form.component.html',
  styleUrls: ['./edit-password-form.component.scss']
})
export class EditPasswordFormComponent implements OnInit {

  public formEditPassword: FormGroup;
  @Input() userInfo: CUserInfo;
  public isSubmitted: boolean;

  constructor(private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public globalService: GlobalService,
    private bsModalRef: BsModalRef) {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.formEditPassword = this.formBuilder.group({
      login: [this.userInfo.login],
      password: [this.userInfo.password, [Validators.required, Validators.minLength(3)]],
      confirmPassword: [this.userInfo.confirmPassword, Validators.required]
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formEditPassword.invalid) {
      let dataForm = this.formEditPassword.value;
      let userInfo: CUserInfo = dataForm as CUserInfo;
      this.spinnerService.show();
      userInfo.id = this.userInfo.id;
      userInfo.email = this.userInfo.login;
      this.editPasswordUser(userInfo);
    }
  }

  public editPasswordUser(userInfo: CUserInfo) {
    this.globalService.post(this.globalUrlsService.urlForcePassword, userInfo).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
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
