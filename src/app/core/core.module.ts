import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { ShellGuestComponent } from './components/shell-guest/shell-guest.component';
import { ShellAuthComponent } from './components/shell-auth/shell-auth.component';
import { AuthGuard } from './guards/auth.guard';
import { I18nService } from './services/i18n/i18n.service';
import { GuestGuard } from './guards/guest.guard';
import { BootstrapCoreModule } from './bootstrap.core.module';
import { AccountService } from './services/account.service';
import { AuthenticationInterceptor } from './services/interceptor/authentication.interceptor.service';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule,
        RouterModule,

        BootstrapCoreModule,
    ],
    declarations: [
        ShellGuestComponent,
        ShellAuthComponent,
    ],
    providers: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        // Import guard
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }
    
    // forRoot allows to override providers
    // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AccountService,
                AuthGuard,
                GuestGuard,
                I18nService,

                { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },

                // // api backend simulation
                // // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
                // //{ provide: HTTP_INTERCEPTORS, useClass: OrderFakeInterceptor, multi: true },
            ]
        };
    }
}