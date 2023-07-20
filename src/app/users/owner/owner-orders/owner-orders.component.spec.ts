import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOrdersComponent } from './owner-orders.component';

describe('OwnerOrdersComponent', () => {
  let component: OwnerOrdersComponent;
  let fixture: ComponentFixture<OwnerOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerOrdersComponent]
    });
    fixture = TestBed.createComponent(OwnerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
