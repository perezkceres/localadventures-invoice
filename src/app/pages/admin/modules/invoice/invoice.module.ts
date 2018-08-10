import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { InvoiceComponent } from './invoice.component';
import { MainInvoiceComponent } from './components/main-invoice/main-invoice.component';
import { BootstrapCoreModule } from '../../../../core/bootstrap.core.module';
import { AdminInvoiceRoutingModule } from './invoice.routing';
import { FaqInvoiceComponent } from './components/faq-invoice/faq-invoice.component';


@NgModule({
    declarations: [
        InvoiceComponent,
        MainInvoiceComponent,
        FaqInvoiceComponent,
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