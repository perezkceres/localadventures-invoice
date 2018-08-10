import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";

export interface ICompany extends IBase {
    name: string;
    firstLastName: string;
    website: string;
    address: string;
    cityState: string;
    country: string;
    phone: string;
    email: string;
}

export class Company extends Base implements ICompany {
    name: string;
    firstLastName: string;
    website: string;
    address: string;
    cityState: string;
    country: string;
    phone: string;
    email: string;

    constructor(options?: ICompany) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): ICompany {
        return {
            id: null,
            name: null,
            firstLastName: null,
            website: null,
            address: null,
            cityState: null,
            country: null,
            phone: null,
            email: null,
        };
    }
} 