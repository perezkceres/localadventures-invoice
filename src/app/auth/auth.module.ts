import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth.module.routing';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BootstrapCoreModule } from '../core/bootstrap.core.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        BootstrapCoreModule,
        
        AuthRoutingModule,
    ],
    declarations: [LoginComponent, LogoutComponent]
})
export class AuthModule { }
