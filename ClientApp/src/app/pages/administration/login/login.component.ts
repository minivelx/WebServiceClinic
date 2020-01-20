import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CLogin } from 'src/app/classes/cLogin/cLogin';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public login: CLogin;
  public isSubmitted: boolean;

  constructor(private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService,
    private spinnerService: NgxSpinnerService,
    public formBuilder: FormBuilder,
    public globalService: GlobalService,
    public navigationService: NavigationService) {
    this.login = new CLogin();
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: [this.login.email, Validators.required],
      password: [this.login.password, Validators.required]
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.formLogin.invalid) {
      let dataForm = this.formLogin.value;
      let login: CLogin = dataForm as CLogin;
      this.spinnerService.show();
      this.Loggear(login);
    }
  }
 

  public Loggear(login: CLogin) {
    this.globalService.post(this.globalUrlsService.urlLogin, login).then((result: any) => {
      this.spinnerService.hide();
      if (result.success) {
        localStorage.setItem("token", JSON.stringify(result));
        this.globalService.setTokenHeader(result.token);
        this.globalService.roles = result.roles;
        this.globalService.currentUser = result.nombre;
        this.navigationService.homePage();
      } else {
        this.toastr.error(result.message, "", { timeOut: result.message.length * 100 });
      }
    }).catch((err: any) => {
      this.spinnerService.hide();
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }
}
