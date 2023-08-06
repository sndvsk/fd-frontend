import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss']
})
export class RoleSelectionComponent {
  @Output() roleSelected = new EventEmitter<string>();

  selectRole(role: string) {
    this.roleSelected.emit(role);
  }
}
