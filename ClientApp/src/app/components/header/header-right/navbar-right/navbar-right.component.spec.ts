import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRightComponent } from './navbar-right.component';

describe('NavbarRightComponent', () => {
  let component: NavbarRightComponent;
  let fixture: ComponentFixture<NavbarRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
