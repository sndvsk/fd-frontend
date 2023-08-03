import { OperatorFunction, Observable, ObservedValueOf, catchError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

export function handleError<T>(toast: HotToastService): OperatorFunction<T, T | ObservedValueOf<T>> {
  return catchError<T, Observable<T>>((error) => {
    toast.error(`Error.<br>Status: ${error.status}<br>Message: ${error.statusText}`);
    throw error;
  });
}
