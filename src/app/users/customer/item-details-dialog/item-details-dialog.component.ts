import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-details-dialog',
  templateUrl: './item-details-dialog.component.html',
  styleUrls: ['./item-details-dialog.component.scss'],
})
export class ItemDetailsDialogComponent implements OnInit {
  allergens = 'none';
  ingredients?: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
    this.ingredients = this.formatIngredients(this.data.item.ingredients);
    this.allergens = this.data.item.allergens.length > 0 ? this.formatIngredients(this.data.item.allergens) : 'none';
  }

  formatIngredients(ingredients: string[]): string {
    return ingredients.map((ingredient) => this.capitalizeFirstLetter(ingredient.trim())).join(', ');
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
