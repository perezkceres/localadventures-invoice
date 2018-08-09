export class IterableObject {
    // para poder obtener un valor de la forma obj[key] y ts no detecte error
    [key: string]: any;
}

/**
 * Interfaz Base del modelo
 */
export interface IBase {
    id: string;
}

/**
 * Entidad base del modelo
 */
export class Base extends IterableObject implements IBase {
    id: string;
}