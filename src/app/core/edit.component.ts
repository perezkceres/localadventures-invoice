import { FormGroup, FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Subscription } from "rxjs";
import * as _ from "lodash";

import { IterableObject, IBase } from "./models/base.model";
import { CrudComponent } from "./crud.component";
import { ModelService } from "./services/model.service";


export abstract class EditComponent<T extends IBase> extends CrudComponent<T> {
    protected itemId: string;

    public form: FormGroup;
    protected formSubmitAttempt: boolean;
    protected formErrors: IterableObject;

    protected urlEntityHome: Array<string>;
    protected sub: Subscription;

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: ModelService<T>, protected item: T
    ) {
        super();

        this.formSubmitAttempt = false;
        this.formErrors = new IterableObject();
    }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.itemId = params['id'];
        });

        // el formulario tiene que inicializarse aqui para poder pintarse bien en la UI
        this.form = this.serv.toFormGroup(this.item);

        // se bindea la entidad del modelo con los campos del formulario
        this.form.patchValue(this.item);
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Iniciando suscripcion de cambios en el formulario para mostrar mensajes personalizados
     * @see https://blog.knoldus.com/2017/06/14/validations-for-template-driven-forms-in-angular-4/
     */
    public ngAfterViewChecked(): void {
        this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    /**
     * Se observa los cambios sobre el formulario para mostrar errores de validacion
     * 
     * @param data T
     */
    protected onValueChanged(data: any) {
        if (!this.form) { return; }

        this.formErrors = new IterableObject();

        _.each(_.keys(data), (field: string) => {
            const control = this.form.get(field);

            this.updateFormErrorsFromField(control, field);
        });
    }

    /**
     * Actualizando mensajes de error sobre un campo en especifico
     * 
     * @param control AbstractControl
     * @param field string
     */
    protected updateFormErrorsFromField(control: AbstractControl, field: string): void {
        this.formErrors[field] = new Array<string>();
        let hasErrorRequired = false;

        if (control && control.errors && control.dirty && !control.valid) {
            _.each(_.keys(control.errors), key => {
                const error = this.serv.getErrorMessage(field, key);

                if (!hasErrorRequired) {
                    if (key == 'required') {
                        hasErrorRequired = true;
                        this.formErrors[field] = new Array<string>(error);
                    } else {
                        this.formErrors[field].push(error);
                    }
                }
            });
        }
    }

    /**
     * Devuelve posible error global a mostrar en el formulario
     */
    protected getGlobalError(): string {
        let error = this.serv.getErrorMessages('server__global');

        return error.length > 0 ? error[0] : '';
    }

    /**
     * Verificando si el campo es valido
     * 
     * @param field 
     */
    public isFieldValid(field: string) {
        let item = this.form.get(field);
        if (item == null) return;

        return (!item.valid && item.touched) || (item.untouched && this.formSubmitAttempt);
    }

    /**
     * Devuelve diccionario de mensajes de validacion para el formulario de Enterprise
     */
    public getErrorMessages(field: string): Array<string> {
        let messages = this.formErrors && this.formErrors.hasOwnProperty(field) ? this.formErrors[field] : [];

        return messages;
    }

    public displayFieldCss(field: string) {
        return {
            'has-danger': this.isFieldValid(field),
            // 'has-feedback': this.isFieldValid(field)
        };
    }

    /**
     * Cuando se va a hacer submit al formulario, se realiza la validacion de todos los campos
     * 
     * @see https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
     * @param formGroup 
     */
    public validateAllFormFields(formGroup: FormGroup): void {
        _.each(_.without(_.keys(formGroup.controls), 'id'), field => {
            const control = formGroup.get(field);
            this.validateSpecificFormField(control);

            this.updateFormErrorsFromField(control, field);
        });
    }

    /**
     * Validando campo especifico del formulario
     * 
     * @param control AbstractControl
     */
    protected validateSpecificFormField(control: AbstractControl): void {
        if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    }

    /**
     * Redirecciona al home de la entidad del modelo
     */
    public redirectEntityHome(): Promise<boolean> {
        // return this.router.navigate(this.urlEntityHome);
        return this.router.navigateByUrl(this.urlEntityHome[0]);
    }

    /**
     * Resetea valores del formulario
     */
    public reset() {
        this.form.reset();
        this.formSubmitAttempt = false;
    }

    /**
     * Hubo un error al intentar guardar el formulario
     * TODO: realizar un trabajo con eventos
     * 
     * @param res { error, keys }
     */
    protected _onSubmitError(res: any) {
        if (res.hasOwnProperty('keys')) {
            let keys: Array<string> = res['keys'];

            // marcando campos del formulario como incorrectos
            _.each(keys, (key: string) => {
                let control = this.form.controls[key.toLowerCase()];

                control.setErrors({ 'incorrect': true });
                control.markAsDirty({ onlySelf: true });
            });

            this.validateAllFormFields(this.form);
            this.onValueChanged(this.form.value);
        }
    }
}