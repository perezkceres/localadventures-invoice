import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";
import { ICompany, Company } from "./company.model";
import { IClient, Client } from "./client.model";
import { IService, Service } from "./service.model";


export interface IInvoice extends IBase {
    company: ICompany;
    client: IClient;
    services: Array<IService>;

    invoiceNro: number;
    invoiceDate: Date;
    dueDate: Date;

    invoiceNroText: string;
    invoiceDateText: string;
    dueDateText: string;

    serviceIdText: string;
    serviceDescriptionText: string;
    serviceQtyText: string;
    servicePriceText: string;

    comment: string;
    subTotal: number;
    tax: number;
    discount: number;
    total: number;

    serviceHours: boolean;
}

export class Invoice extends Base implements IInvoice {
    company: ICompany;
    client: IClient;
    services: Array<IService>;

    invoiceNro: number;
    invoiceDate: Date;
    dueDate: Date;

    invoiceNroText: string;
    invoiceDateText: string;
    dueDateText: string;

    serviceIdText: string;
    serviceDescriptionText: string;
    serviceQtyText: string;
    servicePriceText: string;

    comment: string;
    subTotal: number;
    tax: number;
    discount: number;
    total: number;

    serviceHours: boolean;

    constructor(options?: IInvoice) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IInvoice {
        let services = new Array<IService>();
        services.push(new Service());

        return {
            id: null,
            company: new Company(),
            client: new Client(),
            services: services,
        
            invoiceNro: null,
            invoiceDate: new Date(),
            dueDate: new Date(),

            invoiceNroText: 'Invoice No:',
            invoiceDateText: 'Invoice Date:',
            dueDateText: 'Due Date:',

            serviceIdText: 'ID',
            serviceDescriptionText: 'Description',
            serviceQtyText: 'Quantity',
            servicePriceText: 'Price',
        
            comment: null,
            subTotal: 0,
            tax: null,
            discount: null,
            total: 0,

            serviceHours: false,
        };
    }

    /** actualiza texto segun tipo de servicio */
    public updateServiceText() {
        if (this.serviceHours) {
            this.serviceQtyText = 'Hours';
            this.servicePriceText = 'Rate';
        }
    }
} 