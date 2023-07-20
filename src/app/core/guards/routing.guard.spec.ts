import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { RoutingGuard } from './routing.guard';

describe('RoutingGuard', () => {
    let guard: RoutingGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RoutingGuard],
        });

        guard = TestBed.inject(RoutingGuard);
    });

    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => guard.canActivate(...guardParameters));

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
