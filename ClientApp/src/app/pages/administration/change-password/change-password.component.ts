import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { CChangePassword } from 'src/app/classes/cChangePassword/cChangePassword';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
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
export class ChangePasswordComponent implements OnInit {

  public formChangePassword: FormGroup;
  public changePassword: CChangePassword;
  public isSubmitted: boolean;

  constructor(private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public globalService: GlobalService,
    public navigationService: NavigationService) {
    this.isSubmitted = false;
    this.changePassword = new CChangePassword();
  }

  ngOnInit() {
    this.formChangePassword = this.formBuilder.group({
      oldPassword: [this.changePassword.oldPassword, Validators.required],
      newPassword: [this.changePassword.newPassword, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.changePassword.confirmPassword, Validators.required]
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formChangePassword.invalid) {
      let dataForm = this.formChangePassword.value;
      let changePassword: CChangePassword = dataForm as CChangePassword;
      this.spinnerService.show();
      this.changePasswordUser(changePassword);
    }
  }

  public changePasswordUser(changePassword: CChangePassword) {
    this.globalService.post(this.globalUrlsService.urlChangePassword, changePassword).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        this.formChangePassword.reset();
        this.isSubmitted = false;
        this.toastr.success(result.message, "", { timeOut: result.message.length * 100 });
      } else {
        this.toastr.error(result.message, "", { timeOut: result.message.length * 100 });
      }
    }).catch((err: any) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public cancel() {
    this.navigationService.homePage();
  }
}
