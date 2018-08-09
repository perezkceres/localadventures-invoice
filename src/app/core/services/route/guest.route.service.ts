import { Route as ngRoute, Routes } from '@angular/router';

import { ShellGuestComponent } from '../../components/shell-guest/shell-guest.component';
import { GuestGuard } from '../../guards/guest.guard';


/**
 * Provides helper methods to create routes.
 */
export class GuestRoute {

    /**
     * Creates routes using the shell component and authentication.
     * @param routes The routes to add.
     * @return {Route} The new route using shell as the base.
     */
    static withShell(routes: Routes): ngRoute {
        return {
            path: '',
            component: ShellGuestComponent,
            children: routes,
            canActivate: [GuestGuard],
            // Reuse ShellGuestComponent instance when navigating between child views
            data: { reuse: true }
        };
    }

}
