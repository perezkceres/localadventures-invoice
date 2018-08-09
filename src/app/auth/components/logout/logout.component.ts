import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../core/services/account.service';

@Component({
    template: '&nbsp;'
})
export class LogoutComponent implements OnInit {

    constructor(protected router: Router, protected auth: AccountService) { }

    ngOnInit() { 
        this.auth.logout();
    }
}
