import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";

export interface IHowToUse extends IBase {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    employees: string;
    hasServices: string;
}

export class HowToUse extends Base implements IHowToUse {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    employees: string;
    hasServices: string;

    constructor(options?: IHowToUse) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IHowToUse {
        return {
            id: null,
            name: null,
            lastName: null,
            email: null,
            phone: null,
            company: null,
            website: null,
            employees: '1',
            hasServices: 'No',
        };
    }
} 