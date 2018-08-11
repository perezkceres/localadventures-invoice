import { Route as ngRoute, Routes } from '@angular/router';

import { ShellAuthComponent } from '../../components/shell-auth/shell-auth.component';
import { AuthGuard } from '../../guards/auth.guard';


/**
 * Provides helper methods to create routes.
 */
export class AuthRoute {

    /**
     * Creates routes using the shell component and authentication.
     * @param routes The routes to add.
     * @return {Route} The new route using shell as the base.
     */
    static withShell(routes: Routes): ngRoute {
        return {
            path: '',
            component: ShellAuthComponent,
            children: routes,
            canActivate: [AuthGuard],
            // Reuse ShellGuestComponent instance when navigating between child views
            data: { reuse: true }
        };
    }

}
