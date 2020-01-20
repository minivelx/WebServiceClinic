import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTablePaginationComponent } from './select-table-pagination.component';

describe('SelectTablePaginationComponent', () => {
  let component: SelectTablePaginationComponent;
  let fixture: ComponentFixture<SelectTablePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTablePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
