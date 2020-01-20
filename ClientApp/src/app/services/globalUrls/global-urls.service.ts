import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlsService {
  /***************** Actividades********************/
  public urlActivities: string;
  public urlActivitiesTime: string;

  /***************** Administration *****************/
  public urlLogin: string;
  public urlUsers: string;
  public urlDeleteUser: string;
  public urlCreateUser: string;
  public urlEditUser: string;
  public urlRoles: string;
  public urlForcePassword: string;
  public urlChangePassword: string;
  public urlEditPersonalInfo: string;
  /***************** End Administration *****************/

  constructor() {
    /***************** Administration *****************/
    this.urlLogin = "administration/account/login/";
    this.urlUsers = "administration/account/users/";
    this.urlDeleteUser = "administration/account/delete/";
    this.urlCreateUser = "administration/account/create/";
    this.urlEditUser = "administration/account/editUser/";
    this.urlRoles = "administration/account/roles/";
    this.urlForcePassword = "administration/account/forcePassword/";
    this.urlChangePassword = "administration/account/changePassword/";
    this.urlEditPersonalInfo = "administration/account/editPersonalInfo/";
    this.urlActivities = "api/activities/"
    this.urlActivitiesTime = "api/activitiesTime/"
    /***************** End Administration *****************/
  }
}