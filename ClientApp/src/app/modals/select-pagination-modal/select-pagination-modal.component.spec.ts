import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaginationModalComponent } from './select-pagination-modal.component';

describe('SelectPaginationModalComponent', () => {
  let component: SelectPaginationModalComponent;
  let fixture: ComponentFixture<SelectPaginationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPaginationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaginationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
