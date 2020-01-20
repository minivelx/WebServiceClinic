import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './pages/administration/change-password/change-password.component';
import { LoginComponent } from './pages/administration/login/login.component';
import { HomeComponent } from './pages/administration/home/home.component';
import { MedicalAppointmentComponent } from './pages/medical-appointment/medical-appointment.component';

const routes: Routes = [
  /***************** Administration *****************/
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'medicalAppointment', component: MedicalAppointmentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }