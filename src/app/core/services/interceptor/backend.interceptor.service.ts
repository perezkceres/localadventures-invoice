// import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import * as FAQ from '../../db/faq.json';
 

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    // http://jasonwatmore.com/post/2018/06/22/angular-6-mock-backend-example-for-backendless-development
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get all FAQ
            if (request.url.endsWith('/faq') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: FAQ }));
            }
 
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };
 
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }
 
            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;
 
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }
 
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
 
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}