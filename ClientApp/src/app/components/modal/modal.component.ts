import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterContentInit {

  @Input() title;
  @Input() caption;
  @Input() showButtons;
  @Input() bodyClass;
  @Input() modalSize;
  @Input() messageTooltip;

  @ContentChild("form", {static: false}) child;

  constructor(public bsModalRef: BsModalRef, private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  public submit() {
    let result = this.child.submit();
    if (result) {
      this.bsModalRef.hide();
    }
  }
  
  public hide() {
    let toast = this.toastr.info("¿Está seguro que desea salir?", "", {
      closeButton: true
    })
    toast.onAction.subscribe(() => {
      this.bsModalRef.hide();
    });
  }


}