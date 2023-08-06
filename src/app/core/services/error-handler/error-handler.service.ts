import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    const errorHeaders = error.error;
    const httpError = new HttpErrorResponse({
      error: {
        message: errorHeaders.errorMessage,
        errorCode: errorHeaders.errorCode,
      },
      status: errorHeaders.errorCode,
      statusText: errorHeaders.errorMessage,
      url: error.url ?? 'Unknown URL',
    });
    console.error(httpError);
    return throwError(() => httpError);
  }
}
