import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(public router: Router) { }

  /***************** Administration *****************/
  public homePage() {
    this.router.navigate(['/home']);
  }

  public loginPage() {
    this.router.navigate(['/login']);
  }

  public changePasswordPage() {
    this.router.navigate(['/changePassword']);
  }
  /***************** End Administration *****************/

  public medicalAppointmentPage() {
    this.router.navigate(['/medicalAppointment']);
  }
}
