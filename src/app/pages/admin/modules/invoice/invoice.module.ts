import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { InvoiceComponent } from './invoice.component';
import { MainInvoiceComponent } from './components/main-invoice/main-invoice.component';
import { BootstrapCoreModule } from '../../../../core/bootstrap.core.module';
import { AdminInvoiceRoutingModule } from './invoice.routing';


@NgModule({
    declarations: [
        InvoiceComponent,
        MainInvoiceComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        BootstrapCoreModule,

        AdminInvoiceRoutingModule,
    ],
    providers: []
})
export class InvoiceModule {
    constructor() { }
}