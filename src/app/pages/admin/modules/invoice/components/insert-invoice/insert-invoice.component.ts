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

    /** controla visualizacion de popover para Switch to hours/rates */
    hiddenPopover: boolean;

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: InvoiceService
    ) {
        super(route, router, serv, new Invoice());

        this.hiddenPopover = false;
    }

    ngAfterViewInit(): void { }

    /** Enviar datos al servidor */
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
        this.hiddenPopover = true;

        this.form.controls['serviceQtyText'].setValue(change ? 'Hours': 'Quantity');
        this.form.controls['servicePriceText'].setValue(change ? 'Rate': 'Price');
    }

    /** obtiene el valor total */
    public totalValue(): number {
        return 0.00;
    }

    /** obtiene el valor subtotal */
    public subTotalValue(): number {
        return 0.00;
    }

    /** cambia el tax entre % y $ */
    public switchTaxType() {
        this.item.taxPercent = !this.item.taxPercent;
    }

    /** cambia el discount entre % y $ */
    public switchDiscountType() {
        this.item.discountPercent = !this.item.discountPercent;
    }

    /** obtiene el simbolo que se utiliza en el resumen del invoice */
    public getPercentMoney(type: boolean): string {
        return type ? '%' : '$';
    }
}
