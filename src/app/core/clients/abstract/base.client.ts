import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseClient<T> {

  private readonly baseUrl = environment.apiUrl + this.getResourceUrl();

  constructor(protected http: HttpClient) {}

  abstract getResourceUrl(): string;

/*   protected getList(page: number, count: number): Observable<T[]> {
    let params = new HttpParams()
			.set('page', page.toString())
			.set('count', count.toString());

    return this.http.get<T[]>(`/${this.baseUrl}}?${params.toString()}`)
      .pipe(
        catchError(this.handleError)
      );
  } */

  protected get(id: string | number): Observable<T> {
    return this.http.get<T>(`/${this.baseUrl}}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  protected add(resource: T): Observable<any> {
    return this.http.post(`/${this.baseUrl}}`, resource);
  }

  protected delete(id: string | number): Observable<any> {
    return this.http.delete(`/${this.baseUrl}}/${id}`) 
      .pipe(
        catchError(this.handleError)
      );
  }

  protected update(resource: T) {
    return this.http.put(`/${this.baseUrl}}`,resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse) {
    const errorHeaders = error.error;
    const httpError = new HttpErrorResponse({
      error: {
        message: errorHeaders.errorMessage,
        errorCode: errorHeaders.errorCode
      },
      status: errorHeaders.errorCode,
      statusText: errorHeaders.errorMessage,
      url: error.url || ''
    });
    console.error(httpError);
    return throwError(() => 'Something wrong happened');
  }
  
}
