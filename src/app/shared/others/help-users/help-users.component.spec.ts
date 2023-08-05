import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsersComponent } from './help-users.component';

describe('HelpUsersComponent', () => {
  let component: HelpUsersComponent;
  let fixture: ComponentFixture<HelpUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpUsersComponent]
    });
    fixture = TestBed.createComponent(HelpUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
