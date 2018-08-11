import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";


export interface IAccountService {
    // token: string;
    // username: string;
    login(username: string, password: string);
    logout();
    isAuthenticated();
}

@Injectable()
export class AccountService implements IAccountService {

    public loggedIn: BehaviorSubject<boolean>;

    constructor(private http: HttpClient, private router: Router) {
        this.loggedIn = new BehaviorSubject<boolean>(false);
    }

    public login(username: string, password: string): Observable<any> {
        // @TODO here!
        return new Observable();
    }

    public logout() {
        // @TODO here!
    }

    /** validando si el usuario esta autenticado */
    public isAuthenticated(): Observable<boolean> {
        // @TODO here!
        return new BehaviorSubject<boolean>(true).asObservable();
    }

    /** validando si el usuario NO esta autenticado */
    public isInvited(): Observable<boolean> {
        // @TODO here!
        return new BehaviorSubject<boolean>(false).asObservable();
    }

    /** token de autenticacion del usuario */
    public get accessToken(): string {
        // @TODO here!
        return '8k2nCc5jWmbBDNXd@fzmPaYQv263&LCyyCkNshLLHgp?$PZ%an9eX*XZ#H+rWrdtA?8xjRGVBB3j7Cvet=MeM56Qm3ybC';
    }
}