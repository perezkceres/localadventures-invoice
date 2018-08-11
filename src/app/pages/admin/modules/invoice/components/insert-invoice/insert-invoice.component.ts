import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from "lodash";

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

    /** base64 de logo de la empresa */
    logoBase64: string;

    /** formulario contiene errores */
    hasError: boolean;

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: InvoiceService
    ) {
        super(route, router, serv, new Invoice());

        this.hiddenPopover = false;
        this.logoBase64 = null;
        this.hasError = false;
    }

    ngAfterViewInit(): void { }

    /** Enviar datos al servidor */
    public onSubmit() {
        this.formSubmitAttempt = true;
        this.hasError = false;

        if (this.form.valid) {
            /** */
        } else {
            this.hasError = true;
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

    /** obtiene el valor subtotal */
    public subTotalValue(): number {
        let subtotal = 0;

        // @TODO optimizar
        _.each(this.form.value.services, s => {
            subtotal += s.qty * s.price;
        });

        return subtotal;
    }

    /** obtiene el valor total */
    public totalValue(): number {
        let subtotal = this.subTotalValue();
        let invoice = this.form.value;
        let tax = 0;
        let discount = 0;

        // calculo el tax
        if (invoice.tax) {
            tax = invoice.taxPercent ? (subtotal * invoice.tax / 100) : parseFloat(invoice.tax);
        }

        // calculo el descuento
        if (invoice.discount) {
            discount = invoice.discountPercent ? (subtotal * invoice.discount / 100) : parseFloat(invoice.discount);
        }

        return subtotal + tax - discount;
    }

    /** cambia el tax entre % y $ */
    public switchTaxType() {
        this.item.taxPercent = !this.item.taxPercent;
        this.form.controls['taxPercent'].setValue(this.item.taxPercent);
    }

    /** cambia el discount entre % y $ */
    public switchDiscountType() {
        this.item.discountPercent = !this.item.discountPercent;
        this.form.controls['discountPercent'].setValue(this.item.discountPercent);
    }

    /** obtiene el simbolo que se utiliza en el resumen del invoice */
    public getPercentMoney(type: boolean): string {
        return type ? '%' : '$';
    }

    /** visualiza el logo de la empresa */
    public changeLogo() {
        this.getLogoBase64().then(data => {
            this.logoBase64 = data;
        }).catch(() => {
            this.logoBase64 = null;
        });
    }

    /**
     * Convierte el certificado digital en base64
     */
    private getLogoBase64(): Promise<string> {
        const file: File = (document.querySelector('.wrapper-logo-company input[type="file"]') as any).files[0];

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
    }
}
