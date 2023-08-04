import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, JsonpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbxJsonpInterceptor extends JsonpInterceptor {
  override intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders(),
    });

    return next.handle(req);
  }
}
