import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { InvoiceComponent } from './invoice.component';
import { MainInvoiceComponent } from './components/main-invoice/main-invoice.component';
import { BootstrapCoreModule } from '../../../../core/bootstrap.core.module';
import { AdminInvoiceRoutingModule } from './invoice.routing';
import { FaqInvoiceComponent } from './components/faq-invoice/faq-invoice.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { InsertInvoiceComponent } from './components/insert-invoice/insert-invoice.component';


@NgModule({
    declarations: [
        InvoiceComponent,
        MainInvoiceComponent,
        InsertInvoiceComponent,
        FaqInvoiceComponent,
        HowToUseComponent,
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