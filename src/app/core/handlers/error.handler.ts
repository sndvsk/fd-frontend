import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private errorHandlerService: ErrorHandlerService) {}

  handleError(error: unknown) {
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        this.errorHandlerService.handleError(error);
      } else {
        // Handle any other type of errors
      }
    });
  }
}
