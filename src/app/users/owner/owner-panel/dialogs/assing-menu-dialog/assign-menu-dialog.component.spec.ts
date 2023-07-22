import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignMenuDialogComponent } from './assign-menu-dialog.component';

describe('AssingMenuDialogComponent', () => {
  let component: AssignMenuDialogComponent;
  let fixture: ComponentFixture<AssignMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignMenuDialogComponent],
    });
    fixture = TestBed.createComponent(AssignMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
