import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(public router: Router) { }

  /*****************Actividades**********************/
  public activityPage() {
    this.router.navigate(['/activity']);
  }

  /***************** Administration *****************/
  public homePage() {
    this.router.navigate(['/home']);
  }

  public loginPage() {
    this.router.navigate(['/login']);
  }

  public userAccountPage() {
    this.router.navigate(['/userAccount']);
  }

  public changePasswordPage() {
    this.router.navigate(['/changePassword']);
  }

  public updateDataPage() {
    this.router.navigate(['/updateData']);
  }
  /***************** End Administration *****************/
}
