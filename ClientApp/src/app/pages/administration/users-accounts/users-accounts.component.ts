import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in.animation';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { GlobalService } from 'src/app/services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { UserAccountModalComponent } from 'src/app/modals/user-account-modal/user-account-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CUserInfo } from 'src/app/classes/cUserInfo/cUserInfo';
import { GlobalUrlsService } from 'src/app/services/globalUrls/global-urls.service';
import { EditPasswordModalComponent } from 'src/app/modals/edit-password-modal/edit-password-modal.component';

@Component({
  selector: 'app-users-accounts',
  templateUrl: './users-accounts.component.html',
  styleUrls: ['./users-accounts.component.scss'],
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
export class UsersAccountsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public lstUserInfo: CUserInfo[];
  public subscriptions: Subscription[];

  constructor(private globalService: GlobalService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private globalUrlsService: GlobalUrlsService) {
    this.lstUserInfo = [];
    this.subscriptions = [];
    this.dtOptions = {
      retrieve: true,
      dom: 'lfrtip',
      columns: [
        null,
        null,
        null,
        { className: "text-center", orderable: false }
      ],
      autoWidth: true,
      language: this.globalService.lenguajeDataTable,
      scrollX: true,
      proccessing: true
    };
  }

  ngOnInit() {
    this.listUsers();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  updateTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  public listUsers() {
    this.globalService.get(this.globalUrlsService.urlUsers).then((res: any) => {
      if (res.success) {
        this.lstUserInfo = res.message;
        this.updateTable();
      } else {
        this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
      }
    }, (err) => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public openModal() {
    this.modalService.show(UserAccountModalComponent, { keyboard: false, ignoreBackdropClick: true });
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.listUsers();
        this.unsubscribe();
      })
    );
  }

  public deleteUser(userInfo: CUserInfo) {
    let toast = this.toastr.info("¿Está seguro de eliminar el usuario: " + userInfo.name + "?", "", {
      closeButton: true
    })
    toast.onAction.subscribe(() => {
      this.globalService.delete(this.globalUrlsService.urlDeleteUser, userInfo.id.toString()).then((res: any) => {
        if (res.success) {
          this.listUsers();
          this.toastr.success(res.message, "", { timeOut: res.message.length * 100 });
        } else {
          this.toastr.error(res.message, "", { timeOut: res.message.length * 100 });
        }
      }, (err) => {
        this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
      });
    })
  }

  public openEditModal(userInfo: CUserInfo, isEdit: boolean) {
    this.globalService.get(this.globalUrlsService.urlUsers, userInfo.id).then((res: any) => {
      if (res.success) {
        userInfo = res.message;

        const initialState = {
          userInfo: userInfo,
          isEdit: isEdit,
          showButtons: isEdit
        }
        this.modalService.show(UserAccountModalComponent, { initialState, keyboard: false, ignoreBackdropClick: true });
        this.subscriptions.push(
          this.modalService.onHidden.subscribe((reason: string) => {
            this.listUsers();
            this.unsubscribe();
          })
        );
      }
    }).catch(err => {
      this.toastr.error(err.message, "", { timeOut: err.message.length * 100 });
    });
  }

  public openModalChangePassword(userInfo: CUserInfo) {
    const initialState = {
      userInfo: userInfo
    }
    this.modalService.show(EditPasswordModalComponent, { initialState, keyboard: false, ignoreBackdropClick: true });
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.listUsers();
        this.unsubscribe();
      })
    );
  }

  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
