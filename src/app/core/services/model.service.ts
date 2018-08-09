import { FormGroup } from "@angular/forms";
import { Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import * as _ from "lodash";

import { IAccountService } from "./account.service";
import { IBase, IterableObject } from "../models/base.model";

/**
 * Interfaz base para los Servicios
 */
export interface IModelService<T extends IBase> {
    findAll(url?: string): Promise<Array<T>>;

    findById(id: string, url?: string): Promise<T>;

    create(item: T, url?: string): Promise<T>;

    update(item: IBase, url?: string): Promise<any>;

    delete(id: string, url?: string): Promise<any>;

    toFormGroup(item: T): FormGroup;

    getErrorMessages(field: string): Array<string>;

    getErrorMessage(field: string, key: string): string;
}

export abstract class ModelService<T extends IBase> implements IModelService<T> {
    protected urlBase: string;
    protected errorMessages: IterableObject;

    constructor(
        protected http: HttpClient, 
        protected auth: IAccountService
    ) {
        this.errorMessages = new IterableObject();
    }

    /**
     * Obtiene todos los elementos de una Entidad
     */
    public findAll(url?: string): Promise<Array<T>> {
        return this.http.get<Array<T>>(url || this.urlBase)
            .toPromise()
            .catch(e => this.handleError(e));
    }

    /**
     * Obtiene una entidad en especifico
     * 
     * @param id PK de la entidad
     */
    public findById(id: string, url?: string): Promise<T> {
        return this.http.get<T>(`${url || this.urlBase}/${id}`)
            .toPromise()
            .catch(e => this.handleError(e));
    }

    /**
     * Crea una entidad nueva del modelo
     * 
     * @param item Entidad del modelo
     */
    public create(item: T, url?: string): Promise<T> {
        return this.http.post<T>((url || this.urlBase), item)
            .toPromise()
            .catch(e => this.handleError(e));
    }

    /**
     * Actualiza una entidad del modelo
     * 
     * @param item Entidad del modelo
     */
    public update(item: T, url?: string): Promise<any> {
        return this.http.put((url || `${this.urlBase}/${item.id}`), item, { responseType: 'text' })
            .toPromise()
            .catch(e => this.handleError(e));
    }

    /**
     * Elimina una entidad del modelo a partir de su PK
     * 
     * @param id PK de la entidad
     */
    public delete(id: string, url?: string): Promise<any> {
        return this.http.delete((url || `${this.urlBase}/${id}`), { responseType: 'text' })
            .toPromise()
            .catch(e => this.handleError(e));
    }

    /**
     * Genera un FormGroup a partir de una entidad del modelo y sus datos
     * 
     * @param item Entidad del modelo
     */
    public toFormGroup(item: T): FormGroup {
        throw new Error("Method not implemented.");
    }

    /**
     * Devuelve diccionario de mensajes de validacion para el formulario de Enterprise
     */
    public getErrorMessages(field: string): Array<string> {

        // server message
        const item_server: object = this.errorMessages.hasOwnProperty(`server_${field}`) ? this.errorMessages[`server_${field}`] : {};
        let msg_server: Array<string> = _.values(item_server);

        // default message
        const item_default: object = this.errorMessages.hasOwnProperty(field) ? this.errorMessages[field] : {};
        let msg_default: Array<string> = _.values(item_default);

        // los mensajes con prioridad son los del servidor en caso de existir
        let message: Array<string> = msg_server.length ? msg_server : msg_default;

        return message;
    }

    /**
     * Devuelve mensaje de error asociado a un campo y un error en especifico
     */
    public getErrorMessage(field: string, key: string): string {
        let message: string;

        // server message
        const item_server: object | false = this.errorMessages.hasOwnProperty(`server_${field}`) ? this.errorMessages[`server_${field}`] : false;
        // default message
        const item_default: object | false = this.errorMessages.hasOwnProperty(field) ? this.errorMessages[field] : false;

        if (item_server) {
            message = item_server[0];
        } else if (item_default && item_default.hasOwnProperty(key)) {
            message = item_default[key]
        }

        return message;
    }

    /**
     * Controla handle error a partir de una conexion con el servidor
     * 
     * @see http://www.thejavageek.com/2017/04/16/using-angular-http-service/
     * @param error 
     */
    protected handleError(error: HttpErrorResponse | Response | any): Promise<any> {
        let errorList: Array<any> = new Array<any>();
        let keys: Array<string> = [];

        try {
            if (error.message && error.message.indexOf('No JWT present') > -1) {
                // this.auth.login();
                throw new Error('No JWT present');
            }

            errorList = error.error || error._body;

            switch (error.status) {
                case 400: // BadRequest (Post, Put)
                case 404: // BadRequest (Delete)
                    // elimino validaciones anteriores del servidor en caso de existir
                    this.errorMessages = _.omitBy(this.errorMessages, (value, key) => {
                        return key.startsWith('server_');
                    });

                    // adicionando validaciones del servidor en caso de existir
                    _.each(errorList, (item: any, key: string) => {
                        keys.push(key.toLocaleLowerCase());
                        this.errorMessages[`server_${key.toLocaleLowerCase()}`] = item;
                    });
                    break;
                case 401: // Unauthorized
                case 409: // Conflict
                case 500: // InternalServerError
                default:
                    break;
            }
        } catch (ex) {
            if (typeof errorList === "string") {
                this.errorMessages['server__global'] = new Array<string>(errorList); // viene un msg texto plano
            }
        }

        return Promise.reject({ error, keys });
    }
}