import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";

export interface IClient extends IBase {
    companyName: string;
    name: string;
    address: string;
    cityState: string;
    country: string;
}

export class Client extends Base implements IClient {
    companyName: string;
    name: string;
    address: string;
    cityState: string;
    country: string;

    constructor(options?: IClient) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IClient {
        return {
            id: null,
            companyName: null,
            name: null,
            address: null,
            cityState: null,
            country: null,
        };
    }
} 