import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';
import { MainInvoiceComponent } from './components/main-invoice/main-invoice.component';


const routes: Routes = [
    {
        path: '',
        component: InvoiceComponent,
        children: [
            {
                path: '',
                component: MainInvoiceComponent
            },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminInvoiceRoutingModule { }