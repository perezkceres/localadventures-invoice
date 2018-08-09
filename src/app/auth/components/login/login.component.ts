import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { I18nService } from '../../../core/services/i18n/i18n.service';
import { Logger } from '../../../core/services/logger/logger.service';
import { EditComponent } from '../../../core/edit.component';
import { AccountService } from '../../../core/services/account.service';
import { SignInService } from '../../../core/services/sign-in.service';
import { User } from '../../../core/models/user.model';

const log = new Logger('Login');


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends EditComponent<User> implements OnInit, OnDestroy, AfterViewChecked {

    loading: boolean = false;
    returnUrl: string;
    qpReturnUrl: string;

    // mensajes genericos de error
    errorLogin: boolean = false;
    isNotRegistered: boolean = false;
    undefinedError: boolean = false;

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: SignInService, protected auth: AccountService,
        protected i18n: I18nService
    ) {
        super(route, router, serv, new User());

        this.urlEntityHome = ['/'];
    }

    public ngOnInit() {
        super.ngOnInit();
        this.qpReturnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    /**
     * Enviar datos al servidor
     */
    public onSubmit() {
        this.formSubmitAttempt = true;

        if (this.form.valid && !this.loading) {
            this.urlEntityHome = [this.qpReturnUrl || '/invoice'];

            this.loading = true;
            this.auth.login(this.form.value.username, this.form.value.password).subscribe(user => {
                this.router.navigateByUrl(this.urlEntityHome[0]);
            }, data => {
                this.loading = false;
            });
        } else {
            this.validateAllFormFields(this.form);
        }
    }
}
