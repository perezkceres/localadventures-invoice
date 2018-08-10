import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { ModelService } from "../../../../../core/services/model.service";
import { AccountService } from "../../../../../core/services/account.service";
import { Service } from "../models/service.model";

@Injectable()
export class PaymentService extends ModelService<Service> {

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
    public toFormGroup(item: Service): FormGroup {
        let group: any = {};

        _.each(_.keys(item), (key: string) => {
            let validations;

            switch (key) {
                case "accountNumber":
                case "keyTreasury":
                case "bankId":
                case "password":
                case "digitalCertificate":
                    validations = Validators.required;
                    break;
            }

            group[key] = new FormControl(item[key], validations);
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
            accountNumber: {
                required: 'dashboard.sidebar.advance.payment.validation.accountNumber.required',
            },
            bankId: {
                required: 'dashboard.sidebar.advance.payment.validation.bank.required',
            },
            password: {
                required: 'dashboard.sidebar.advance.payment.validation.password.required',
            },
            keyTreasury: {
                required: 'dashboard.sidebar.advance.payment.validation.keyTreasury.required',
            },
            digitalCertificate: {
                required: 'dashboard.sidebar.advance.payment.validation.digitalCertificate.required',
            },
            email: {
                required: 'dashboard.sidebar.advance.payment.validation.email.required',
                email: 'dashboard.sidebar.advance.payment.validation.email.email',
            },
            cellPhone: {
                required: 'dashboard.sidebar.advance.payment.validation.cellPhone.required',
            },
        };
    }
}