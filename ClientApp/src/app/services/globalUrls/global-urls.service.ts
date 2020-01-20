import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlsService {
  public urlMedicalAppointmentType: string;
  public urlMedicalAppointment: string;

  /***************** Administration *****************/
  public urlLogin: string;
  public urlCreateUser: string;
  public urlEditUser: string;
  public urlRoles: string;
  public urlChangePassword: string;
  public urlEditPersonalInfo: string;
  /***************** End Administration *****************/

  constructor() {
    /***************** Administration *****************/
    this.urlLogin = "administration/account/login/";
    this.urlCreateUser = "administration/account/create/";
    this.urlEditUser = "administration/account/editUser/";
    this.urlRoles = "administration/account/roles/";
    this.urlChangePassword = "administration/account/changePassword/";
    this.urlEditPersonalInfo = "administration/account/editPersonalInfo/";
    this.urlMedicalAppointmentType = "api/medicalAppointmentType/"
    this.urlMedicalAppointment = "api/medicalAppointment/"
    /***************** End Administration *****************/
  }
}