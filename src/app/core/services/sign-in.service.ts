import { FormGroup, Validators, FormControl } from "@angular/forms";

import * as _ from "lodash";

import { ModelService } from "../../core/services/model.service";
import { User } from "../../core/models/user.model";


export abstract class SignInService extends ModelService<User> {
    /**
     * Genera un FormGroup a partir de la entidad SignUp y sus datos
     * 
     * @param item Entidad del modelo
     */
    public toFormGroup(item: User): FormGroup {
        let group: any = {};

        _.each(_.keys(item), (key: string) => {
            let validations;

            switch (key) {
                case "username":
                    validations = [Validators.required];
                    break;
                case "password":
                    validations = Validators.required;
                    break;
            }

            group[key] = new FormControl(item[key], validations);
        });

        return new FormGroup(group);
    }

    /**
     * Actualizando listado de mensajes de validacion
     * https://auth0.com/blog/real-world-angular-series-part-6/
     */
    protected _updateErrorMessages(): void {
        this.errorMessages = {
            server__global: [],
            username: {
                required: 'signup.validation.username.required',
            },
            password: {
                required: 'signup.validation.password.required',
            },
        };
    }
}