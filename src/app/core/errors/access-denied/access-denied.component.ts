import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

    h2Message!: string;
    h1Message! : string;

    constructor(private errorHandler: ErrorHandlerService) { }

    ngOnInit() {
        this.h1Message = "403";
        this.h2Message = "Access Denied";
  }

}
