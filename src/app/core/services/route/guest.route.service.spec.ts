import { TestBed, inject } from '@angular/core/testing';

import { GuestRoute } from './guest.route.service';
import { ShellGuestComponent } from '../../components/shell-guest/shell-guest.component';
// import { MockAuthService } from '../auth/auth.service.mock';
import { GuestGuard } from '../../guards/guest.guard';
import { AccountService } from '../account.service';


describe('GuestRoute', () => {
    let route: GuestRoute;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GuestGuard,
                { provide: AccountService, useClass: MockAuthService },
                GuestRoute
            ]
        });
    });

    beforeEach(inject([GuestRoute], (_route: GuestRoute) => {
        route = _route;
    }));

    describe('withShell', () => {
        it('should create routes as children of shell', () => {
            // Prepare
            const testRoutes = [{ path: 'test' }];

            // Act
            const result = GuestRoute.withShell(testRoutes);

            // Assert
            expect(result.path).toBe('');
            expect(result.children).toBe(testRoutes);
            expect(result.component).toBe(ShellGuestComponent);
        });
    });
});
