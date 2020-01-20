import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModalMultipleTablesComponent } from './show-modal-multiple-tables.component';

describe('ShowModalMultipleTablesComponent', () => {
  let component: ShowModalMultipleTablesComponent;
  let fixture: ComponentFixture<ShowModalMultipleTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowModalMultipleTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowModalMultipleTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
