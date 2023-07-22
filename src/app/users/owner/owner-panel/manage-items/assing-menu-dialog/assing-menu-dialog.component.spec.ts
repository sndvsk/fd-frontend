import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingMenuDialogComponent } from './assing-menu-dialog.component';

describe('AssingMenuDialogComponent', () => {
  let component: AssingMenuDialogComponent;
  let fixture: ComponentFixture<AssingMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssingMenuDialogComponent]
    });
    fixture = TestBed.createComponent(AssingMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
