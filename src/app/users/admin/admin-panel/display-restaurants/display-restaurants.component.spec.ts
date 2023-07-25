import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRestaurantsComponent } from './display-restaurants.component';

describe('DisplayRestaurantsComponent', () => {
  let component: DisplayRestaurantsComponent;
  let fixture: ComponentFixture<DisplayRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRestaurantsComponent]
    });
    fixture = TestBed.createComponent(DisplayRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
