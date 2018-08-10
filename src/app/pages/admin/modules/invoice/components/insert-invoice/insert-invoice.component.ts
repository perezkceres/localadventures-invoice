import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { ActivatedRoute, Router } from '@angular/router';

import { EditComponent } from '../../../../../../core/edit.component';
import { InvoiceService } from '../../services/invoice.service';


@Component({
    selector: 'insert-invoice',
    styleUrls: ['./insert-invoice.component.scss'],
    templateUrl: './insert-invoice.component.html',
})
export class InsertInvoiceComponent extends EditComponent<Invoice> implements OnInit, OnDestroy, AfterViewInit {

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: InvoiceService
    ) {
        super(route, router, serv, new Invoice());
    }

    // ngOnInit(): void { }

    // ngOnDestroy(): void { }

    ngAfterViewInit(): void { }

    /**
     * Enviar datos al servidor
     */
    public onSubmit() {
        this.formSubmitAttempt = true;

        console.log(this.form.value);
        if (this.form.valid) {
            /** */
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    /** obtiene el placeholder siempre de al menos dos digitos */
    public placeholderServiceId(i:number): string {
        return i > 9 ? i.toString() : `0${i}`;
    }
}
