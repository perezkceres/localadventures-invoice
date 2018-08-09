import { Subscription } from "rxjs";
import { IBase } from "./models/base.model";

export abstract class CrudComponent<T extends IBase> {
    /**
     * Titulo de la pagina actual
     */
    protected pageTitle: string;

    /**
     * Habilita la UI para realizar la carga de los datos
     */
    protected enable$: Subscription = null;

    constructor() { }
}