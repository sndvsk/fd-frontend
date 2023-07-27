import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOwnersComponent } from './display-owners.component';

describe('DisplayOwnersComponent', () => {
  let component: DisplayOwnersComponent;
  let fixture: ComponentFixture<DisplayOwnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayOwnersComponent]
    });
    fixture = TestBed.createComponent(DisplayOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
