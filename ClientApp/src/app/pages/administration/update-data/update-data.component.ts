import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss'],
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
export class UpdateDataComponent implements OnInit {

  public formUpdateData: FormGroup;
  public userInfo: CUserInfo;
  public isSubmitted: boolean;

  constructor(private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public globalService: GlobalService,
    public navigationService: NavigationService) {
    this.userInfo = new CUserInfo();
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.getUser();

    this.formUpdateData = this.formBuilder.group({
      email: [this.userInfo.email],
      name: [this.userInfo.name, [Validators.required, Validators.minLength(100)]],
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formUpdateData.invalid) {
      let dataForm = this.formUpdateData.value;
      let userInfo: CUserInfo = dataForm as CUserInfo;
      this.spinnerService.show();
      this.editData(userInfo);
    }
  }

  public editData(userInfo: CUserInfo) {
    this.globalService.put(this.globalUrlsService.urlEditPersonalInfo, userInfo).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        this.formUpdateData.reset();
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

  public getUser() {
    this.spinnerService.show();
    var localStorageToken = localStorage.getItem("token");
    let tokenLS = JSON.parse(localStorageToken);
    let userId = tokenLS.id;
    this.userInfo = new CUserInfo();

    this.globalService.get(this.globalUrlsService.urlUsers, userId).then((res: any) => {
      this.spinnerService.hide();
      if (res.success) {
        this.userInfo = res.message;
        this.formUpdateData = this.formBuilder.group({
          email: [this.userInfo.email],
          name: [this.userInfo.name, Validators.required],

        });
      } else {
        this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
      }
    }, (err) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public cancel() {
    this.navigationService.homePage();
  }
}
