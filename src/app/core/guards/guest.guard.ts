import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Logger } from "../services/logger/logger.service";
import { AccountService } from '../services/account.service';

const log = new Logger('GuestGuard');

/*
 * Checks if the user is gest before routing to the component. 
 * Saves loading time.
 **/
@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private auth: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isInvited().pipe(tap(loggedIn => {
            if (!loggedIn) {
                log.debug('Authenticated, redirecting...');
                this.router.navigate(['/admin']);
            }
        }));
    }
}