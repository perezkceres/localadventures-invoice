import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';

import { AccountService } from '../account.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private inj: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.inj.get(AccountService);

        // get the token from a service
        const token: string = auth.accessToken;

        // add it if we have one
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        }

        // if this is a login-request the header is 
        // already set to x/www/formurl/encoded. 
        // so if we already have a content-type, do not 
        // set it, but if we don't have one, set it to 
        // default --> json
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        // setting the accept header
        if (!req.headers.has('Accept')) {
            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }

        return next.handle(req);
    }
}