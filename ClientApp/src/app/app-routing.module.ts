import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAccountsComponent } from './pages/administration/users-accounts/users-accounts.component';
import { ChangePasswordComponent } from './pages/administration/change-password/change-password.component';
import { UpdateDataComponent } from './pages/administration/update-data/update-data.component';
import { LoginComponent } from './pages/administration/login/login.component';
import { HomeComponent } from './pages/administration/home/home.component';

const routes: Routes = [
  /***************** Administration *****************/
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userAccount', component: UsersAccountsComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'updateData', component: UpdateDataComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }