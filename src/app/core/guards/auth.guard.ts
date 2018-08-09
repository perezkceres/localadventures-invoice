import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Logger } from "../services/logger/logger.service";
import { AccountService } from "../services/account.service";

const log = new Logger('AuthGuard');


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated().pipe(tap(loggedIn => {
            if (!loggedIn) {
                log.debug('Not authenticated, redirecting...');
                this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
            }
        }));
    }
}