//Plugins
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
// import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//Pages
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarMenuComponent } from './components/side-menu/sidebar-menu/sidebar-menu.component';
import { SidebarContentComponent } from './components/side-menu/sidebar-content/sidebar-content.component';
import { HeaderLeftComponent } from './components/header/header-left/header-left.component';
import { HeaderRightComponent } from './components/header/header-right/header-right.component';
import { NavbarLeftComponent } from './components/header/header-right/navbar-left/navbar-left.component';
import { NavbarRightComponent } from './components/header/header-right/navbar-right/navbar-right.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastComponent } from './components/toast/toast.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpanishIntl } from 'src/assets/classes/datetime-picker-language';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowModalComponent } from './modals/show-modal/show-modal.component';
import { ShowTableComponent } from './components/show-table/show-table.component';
import { SelectModalComponent } from './modals/select-modal/select-modal.component';
import { SelectTableComponent } from './components/select-table/select-table.component';
import { TitleCasePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ShowModalMultipleTablesComponent } from './modals/show-modal-multiple-tables/show-modal-multiple-tables.component';
import { LoginComponent } from './pages/administration/login/login.component';
import { ChangePasswordComponent } from './pages/administration/change-password/change-password.component';
import { HomeComponent } from './pages/administration/home/home.component';
import { SelectTablePaginationComponent } from './components/select-table-pagination/select-table-pagination.component';
import { SelectPaginationModalComponent } from './modals/select-pagination-modal/select-pagination-modal.component';
import { UserAccountModalComponent } from './modals/user-account-modal/user-account-modal.component';
import { UserAccountFormComponent } from './pages/administration/users-accounts/user-account-form/user-account-form.component';
import { MedicalAppointmentComponent } from './pages/medical-appointment/medical-appointment.component';
import { MedicalAppointmentModalComponent } from './modals/medical-appointment-modal/medical-appointment-modal.component';
import { MedicalAppointmentFormComponent } from './pages/medical-appointment/medical-appointment-form/medical-appointment-form.component';

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'DD/MM/YYYY hh:mm a',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'hh:mm a',
  monthYearLabel: 'MMMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

const config: InputFileConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SidebarContentComponent,
    HeaderComponent,
    SidebarMenuComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    NavbarLeftComponent,
    NavbarRightComponent,
    FooterComponent,
    ModalComponent,
    ToastComponent,
    ShowModalComponent,
    ShowTableComponent,
    SelectModalComponent,
    SelectTableComponent,
    ShowModalMultipleTablesComponent,
    LoginComponent,
    HomeComponent,
    ChangePasswordComponent,
    SelectTablePaginationComponent,
    SelectPaginationModalComponent,
    UserAccountModalComponent,
    UserAccountFormComponent,
    MedicalAppointmentComponent,
    MedicalAppointmentModalComponent,
    MedicalAppointmentFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    DataTablesModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
      preventDuplicates: true
    }),
    OwlDateTimeModule,
    // OwlMomentDateTimeModule,
    OwlNativeDateTimeModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    AngularFontAwesomeModule,
    InputFileModule.forRoot(config),
    CarouselModule.forRoot()
  ],
  entryComponents: [
    ToastComponent,
    SelectModalComponent,
    SelectPaginationModalComponent,
    ShowModalComponent,
    ShowModalMultipleTablesComponent,
    UserAccountModalComponent,
    MedicalAppointmentModalComponent
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' },
    { provide: OwlDateTimeIntl, useClass: SpanishIntl },
    // { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }