import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { BootstrapCoreModule } from '../../core/bootstrap.core.module';
import { AdminRoutingModule } from './admin.module.routing';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        BootstrapCoreModule,
        
        AdminRoutingModule,
    ],
    providers: []
})
export class AdminModule { }
