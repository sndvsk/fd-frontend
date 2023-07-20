import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMenusComponent } from './manage-menus.component';

describe('ManageMenusComponent', () => {
  let component: ManageMenusComponent;
  let fixture: ComponentFixture<ManageMenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageMenusComponent]
    });
    fixture = TestBed.createComponent(ManageMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
