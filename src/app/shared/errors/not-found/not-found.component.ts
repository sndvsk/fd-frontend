import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  h2Message!: string;
  h1Message!: string;

  ngOnInit() {
    this.h1Message = '404';
    this.h2Message = 'Not Found';
  }
}
