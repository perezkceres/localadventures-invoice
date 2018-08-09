import { TestBed, inject } from '@angular/core/testing';

// import { MockAuthService } from '../auth/auth.service.mock';
import { AuthRoute } from './auth.route.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ShellAuthComponent } from '../../components/shell-auth/shell-auth.component';
import { AccountService } from '../account.service';


describe('AuthRoute', () => {
    let route: AuthRoute;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: AccountService, useClass: MockAuthService },
                AuthRoute
            ]
        });
    });

    beforeEach(inject([AuthRoute], (_route: AuthRoute) => {
        route = _route;
    }));

    describe('withShell', () => {
        it('should create routes as children of shell', () => {
            // Prepare
            const testRoutes = [{ path: 'test' }];

            // Act
            const result = AuthRoute.withShell(testRoutes);

            // Assert
            expect(result.path).toBe('');
            expect(result.children).toBe(testRoutes);
            expect(result.component).toBe(ShellAuthComponent);
        });
    });
});
