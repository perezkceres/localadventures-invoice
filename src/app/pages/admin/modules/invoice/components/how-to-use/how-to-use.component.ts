import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';

import { EditComponent } from '../../../../../../core/edit.component';
import { HowToUse } from '../../models/how-to-use.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HowToUseService } from '../../services/how-to-use.service';
import { HowToUseStep } from '../../models/enum';


@Component({
    selector: 'how-to-use',
    styleUrls: ['./how-to-use.component.scss'],
    templateUrl: './how-to-use.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HowToUseComponent extends EditComponent<HowToUse> implements OnInit, OnDestroy, AfterViewInit {

    /** define si esta habilitado el modal */
    public enableModal: boolean;

    /** activa el control de la salida del modal */
    public outModal: boolean;

    /** formulario contiene errores */
    hasError: boolean;

    /** paso actual del wizard */
    currentStep: HowToUseStep;

    /** enumerativo de pasos */
    step = HowToUseStep;

    /** porciento completado */
    percent: number;

    /** la empresa brinda servicios? */
    servicesList: Array<string> = ['Yes', 'No'];

    /** cantidad de empleados */
    employeesList: Array<string> = ['1', '2 to 5', '6 to 10', '11 to 25', '26 to 50', '51 to 200', '201 to 1,000', '1,001 to 10,000', '10,001 or more'];

    constructor(
        protected route: ActivatedRoute, protected router: Router,
        protected serv: HowToUseService, private el: ElementRef
    ) {
        super(route, router, serv, new HowToUse());

        this.enableModal = false;
        this.outModal = false;
        this.currentStep = HowToUseStep.Zero;
        this.percent = 0;
    }

    ngAfterViewInit(): void { 
        // https://medium.com/claritydesignsystem/four-ways-of-listening-to-dom-events-in-angular-part-1-event-binding-3ec7e9f51a1d
        // https://stackoverflow.com/questions/37247246/html5-event-handlingonfocus-and-onfocusout-using-angular-2

        // document.getElementsByTagName('input') : to gell all Docuement imputs
       const inputList = [].slice.call((<HTMLElement>this.el.nativeElement).getElementsByTagName('input'));
       inputList.forEach((input: HTMLElement) => {
           input.addEventListener('focus', () => {
               this.enableModal = true;
            //    input.classList.toggle('active');
           });
       });
    }

    /** oculta el modal */
    public hideModal() {
        this.enableModal = false;
        this.outModal = true;

        setTimeout(() => {
            this.outModal = false;
        }, 800);
    }

    /** Enviar datos al servidor */
    public onSubmit() {
        this.formSubmitAttempt = true;
        this.hasError = false;

        if (this.form.valid) {
            /** */
        } else {
            this.hasError = true;
            this.validateAllFormFields(this.form);
        }
    }

    /** define el paso actual en la visualizacion */
    public activeStep(step: HowToUseStep): boolean {
        return this.currentStep == step;
    }

    /** prev step */
    public prevStep(): void {
        let step = HowToUseStep.Zero;

        switch(this.currentStep) {
            case HowToUseStep.One:
                step = HowToUseStep.Zero;
                break;
            case HowToUseStep.Two:
                step = HowToUseStep.One;
                break;
            case HowToUseStep.Three:
                step = HowToUseStep.Two;
                break;
            case HowToUseStep.Four:
                step = HowToUseStep.Three;
                break;
            case HowToUseStep.Five:
                step = HowToUseStep.Four;
                break;
        }

        if (this.percent > 0) this.percent -= 20;
        this.currentStep = step;
    }

    /** next step */
    public nextStep(): void {
        let step = HowToUseStep.Zero;

        switch(this.currentStep) {
            case HowToUseStep.Zero:
                step = HowToUseStep.One;
                break;
            case HowToUseStep.One:
                step = HowToUseStep.Two;
                break;
            case HowToUseStep.Two:
                step = HowToUseStep.Three;
                break;
            case HowToUseStep.Three:
                step = HowToUseStep.Four;
                break;
            case HowToUseStep.Four:
                step = HowToUseStep.Five;
                break;
        }

        if (this.percent < 100) this.percent += 20;
        this.currentStep = step;
    }

    /** deshabilita el btn anterior */
    public prevDisabled(): boolean {
        return this.currentStep == HowToUseStep.Zero;
    }

    /** deshabilita el btn siguiente */
    public nextDisabled(): boolean {
        return this.currentStep == HowToUseStep.Five;
    }

    /** habilita el btn descargar */
    public downloadBtn(): boolean {
        return this.currentStep == HowToUseStep.Five;
    }

    public get stepWrapper(): number {
        return this.currentStep;
    }
}
