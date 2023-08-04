import { TestBed } from '@angular/core/testing';

import { JsonpInterceptor } from './jsonp.interceptor';

describe('JsonpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonpInterceptor = TestBed.inject(JsonpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
