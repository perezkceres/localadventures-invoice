import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ModelService } from "../../../../../core/services/model.service";
import { AccountService } from "../../../../../core/services/account.service";
import { environment } from "../../../../../../environments/environment";
import { Faq } from "../models/faq.model";


@Injectable()
export class FaqService extends ModelService<Faq> {

    constructor(
        protected http: HttpClient, protected auth: AccountService
    ) {
        super(http, auth);

        this.urlBase = `${environment.url.api}/faq`;
    }
}