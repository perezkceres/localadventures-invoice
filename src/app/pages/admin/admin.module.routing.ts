import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../../core/services/i18n/i18n.service';

const routes: Routes = [
    { path: '', redirectTo: 'invoice', pathMatch: 'full' }, // ruta default dentro de /admin/
    {
        path: 'invoice',
        loadChildren: './modules/invoice/invoice.module#InvoiceModule',
        data: {
            preload: true,
            title: extract('Invoice'),
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
