import * as _ from "lodash";
import { IBase, Base } from "./base.model";

export interface IUser extends IBase {
    username: string;
    password: string;
}

export class User extends Base implements IBase {
    username: string;
    password: string;

    constructor(options?: IUser) {
        super();

        _.merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IUser {
        return {
            id: null,
            username: null,
            password: null,
        };
    }
} 