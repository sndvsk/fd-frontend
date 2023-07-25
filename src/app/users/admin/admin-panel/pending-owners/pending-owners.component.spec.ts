import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOwnersComponent } from './pending-owners.component';

describe('PendingOwnersComponent', () => {
  let component: PendingOwnersComponent;
  let fixture: ComponentFixture<PendingOwnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingOwnersComponent]
    });
    fixture = TestBed.createComponent(PendingOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
