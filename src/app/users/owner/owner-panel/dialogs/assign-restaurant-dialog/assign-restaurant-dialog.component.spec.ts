import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRestaurantDialogComponent } from './assign-restaurant-dialog.component';

describe('AssignRestaurantDialogComponent', () => {
  let component: AssignRestaurantDialogComponent;
  let fixture: ComponentFixture<AssignRestaurantDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignRestaurantDialogComponent]
    });
    fixture = TestBed.createComponent(AssignRestaurantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
