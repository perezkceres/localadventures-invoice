import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import * as _ from "lodash";

import { ModelService } from "../../../../../core/services/model.service";
import { AccountService } from "../../../../../core/services/account.service";
import { HowToUse, IHowToUse } from "../models/how-to-use.model";


@Injectable()
export class HowToUseService extends ModelService<HowToUse> {

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
    public toFormGroup(item: IHowToUse): FormGroup {
        let group: any = {};

        // http://www.agiratech.com/angular-4-reactive-forms-building-and-validating-forms/
        _.each(_.keys(item), (key: string) => {
            let validations;

            switch (key) {
                case "name":
                case "lastName":
                case "company":
                case "employees":
                case "hasServices":
                    validations = [Validators.required];
                    break;
                case "email":
                    validations = [Validators.required, Validators.email];
                    break;
                case "website":
                    validations = [Validators.required];
                    break;
                case "phone":
                    // https://stackoverflow.com/questions/48996054/angular-5-validators-pattern-regex-for-only-numbers
                    validations = [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)];
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
            name: {
                required: 'Name required',
            },
            lastName: {
                required: 'First and Last Name required',
            },
            website: {
                required: 'Website required',
            },
            phone: {
                required: 'Phone required',
            },
            company: {
                required: 'Company required',
            },
            email: {
                required: 'Email required',
            },
            // employees: {
            //     required: 'Employees required',
            // },
            // hasServices: {
            //     required: 'Services required',
            // },
        };
    }
}