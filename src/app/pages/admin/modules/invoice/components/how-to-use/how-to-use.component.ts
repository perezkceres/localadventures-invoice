import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ElementRef, Renderer2, HostListener, Inject, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { EditComponent } from '../../../../../../core/edit.component';
import { HowToUse } from '../../models/how-to-use.model';
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
        protected serv: HowToUseService, private el: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
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
    //    const inputList = [].slice.call((<HTMLElement>this.el.nativeElement).getElementsByTagName('input'));
    //    inputList.forEach((input: HTMLElement) => {
    //        input.addEventListener('focus', this.openModal);
    //    });
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        /** cuando se llega al ultimo paso, no se muestra el progreso flotante */
        if (this.currentStep == HowToUseStep.Six) {
            this.renderer.removeClass(document.body, 'how-to-use-modal-short');
            return;
        }

        const forms = [].slice.call((<HTMLElement>this.el.nativeElement).getElementsByClassName('modal-container'));
        forms.forEach((element: HTMLElement) => {
            var rect = element.getBoundingClientRect();
            // console.log(rect.top, rect.right, rect.bottom, rect.left);

            let bottom = rect.top - window.innerHeight;
            let top = rect.top + element.clientHeight;
            // console.log({'bottom': bottom, 'top': top});

            // el valor 5 es para un aproximado
            if (bottom <= 5 && top >= 5) { // aparecio por debajo
                this.renderer.removeClass(document.body, 'how-to-use-modal-short');
            } else if (top < 5 || bottom > 5) { // se fue por arriba o por debajo
                this.renderer.addClass(document.body, 'how-to-use-modal-short');
            }
        });
    }

    /** muestra el modal grande */
    public openModal() {
        this.enableModal = true;
        this.renderer.addClass(document.body, 'how-to-use-modal-open');
    }

    /** oculta el modal */
    public hideModal(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        
        this.enableModal = false;
        this.outModal = true;

        this.renderer.removeClass(document.body, 'how-to-use-modal-open');

        /** cuando se llega al ultimo paso, no se muestra el progreso flotante */
        if (this.currentStep == HowToUseStep.Six) {
            this.renderer.removeClass(document.body, 'how-to-use-modal-short');
        }

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
        if (this.percent == 100 || this.percent == 0) this.renderer.removeClass(document.body, 'how-to-use-modal-initialized');

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
            case HowToUseStep.Five:
                step = HowToUseStep.Six;
                break;
        }

        if (this.percent < 100) this.percent += 20;
        if (this.percent > 0) this.renderer.addClass(document.body, 'how-to-use-modal-initialized');

        this.currentStep = step;
    }

    /** deshabilita el btn anterior */
    public prevDisabled(): boolean {
        return this.currentStep == HowToUseStep.Zero;
    }

    /** deshabilita el btn siguiente */
    public nextDisabled(): boolean {
        let inputs = [];
        let isValid;
        let hasValue;

        switch(this.currentStep) {
            case HowToUseStep.Zero:
                inputs = ['name', 'lastName'];
                break;
            case HowToUseStep.One:
                inputs = ['email'];
                break;
            case HowToUseStep.Two:
                inputs = ['phone'];
                break;
            case HowToUseStep.Three:
                inputs = ['company', 'website'];
                break;
            case HowToUseStep.Four:
                inputs = ['employees'];
                break;
            case HowToUseStep.Five:
                inputs = ['hasServices'];
                break;
        }

        inputs.forEach(field => {
            isValid = isValid == undefined ? !this.isFieldValid(field) : isValid && !this.isFieldValid(field);

            let value = this.form.value[field];
            hasValue = hasValue == undefined ? (value != null && value != '') : hasValue && (value != null && value != '');
        });

        return !(isValid && hasValue);
    }

    /** habilita el btn descargar */
    public downloadBtn(): boolean {
        return this.currentStep == HowToUseStep.Five;
    }

    public get stepWrapper(): number {
        return this.currentStep;
    }
}
