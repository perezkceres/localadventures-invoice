import * as _ from "lodash";

import { IBase, Base } from "../../../../../core/models/base.model";

export interface IFaq extends IBase {
    title: string;
    description: string;
    open: boolean;
}

export class Faq extends Base {
    title: string;
    description: string;
    open: boolean;

    constructor(options?: IFaq) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IFaq {
        return {
            id: null,
            title: null,
            description: null,
            open: false
        };
    }
} 