import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";

export interface IService extends IBase {
    description: string;
    qty: number;
    price: number;
    hours: boolean;
}

export class Service extends Base implements IService {
    description: string;
    qty: number;
    price: number;
    hours: boolean;

    constructor(options?: IService) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IService {
        return {
            id: null,
            description: null,
            qty: 1,
            price: null,
            hours: false,
        };
    }
} 