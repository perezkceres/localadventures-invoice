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

    /** adiciona nuevo servicio */
    public addService(){
        this.serv.addService(this.form);
    }

    /** adiciona nuevo servicio */
    public removeService(position: number){
        this.serv.removeService(this.form, position);
    }

    /** Switch to hours/rates */
    public switchHours(change: boolean) {
        this.item.serviceHours = change;

        this.form.value.serviceQtyText = 'Hours';
        this.form.value.servicePriceText = 'Rate';
        this.item.updateServiceText();
    }
}
