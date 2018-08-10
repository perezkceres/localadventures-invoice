import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";

import * as _ from "lodash";

import { ModelService } from "../../../../../core/services/model.service";
import { AccountService } from "../../../../../core/services/account.service";
import { Invoice, IInvoice } from "../models/invoice.model";
import { Base } from "../../../../../core/models/base.model";
import { Service } from "../models/service.model";

@Injectable()
export class InvoiceService extends ModelService<Invoice> {

    constructor(
        protected http: HttpClient, protected auth: AccountService
    ) {
        super(http, auth);

        this._updateErrorMessages();
    }

    /**
     * Genera un FormGroup a partir de la entidad Service y sus datos
     * 
     * @param item Entidad del modelo
     */
    public toFormGroup(item: IInvoice): FormGroup {
        let group: any = {};

        // http://www.agiratech.com/angular-4-reactive-forms-building-and-validating-forms/
        _.each(_.keys(item), (key: string) => {

            if (item[key] instanceof Base) {
                let subGroup: any = {};
                _.each(_.keys(item[key]), (sub: string) => {
                    let subValidations;

                    switch (`${key}.${sub}`) {
                        case 'company.name':
                        case 'company.firstLastName':
                        case 'company.website':
                        case 'company.phone':
                            subValidations = Validators.required;
                            break;
                        case 'company.email':
                            subValidations = [Validators.required, Validators.email];
                            break;
                    }
                    
                    subGroup[sub] = new FormControl(item[key][sub], subValidations);
                });

                group[key] = new FormGroup(subGroup);
            } else if (item[key] instanceof Array) {
                // https://stackoverflow.com/questions/45155112/angular2-reactive-form-table
                let listItems = [];
                // cada uno de los elementos de la lista
                _.each(item[key], (service: Service) => {
                    let subGroup: any = {};
                    _.each(_.keys(service), sub => {
                        let subValidations;
                        
                        subGroup[sub] = new FormControl(service[sub], subValidations);
                    });

                    listItems.push(new FormGroup(subGroup));
                });

                group[key] = new FormArray(listItems);
            } else {
                let validations;

                // switch (key) {
                //     case "digitalCertificate":
                //         validations = Validators.required;
                //         break;
                // }

                group[key] = new FormControl(item[key], validations);
            }
        });

        return new FormGroup(group);
    }

    /**
     * Actualizando listado de mensajes de validacion
     * https://auth0.com/blog/real-world-angular-series-part-6/
     */
    protected _updateErrorMessages(): void {
        this.errorMessages = {
            server__global: [],
            company: {
                name: {
                    required: 'Name required',
                },
                firstLastName: {
                    required: 'First and Last Name required',
                },
                website: {
                    required: 'Website required',
                },
                phone: {
                    required: 'Phone required',
                },
                email: {
                    required: 'Email required',
                },
            },
        };
    }
}