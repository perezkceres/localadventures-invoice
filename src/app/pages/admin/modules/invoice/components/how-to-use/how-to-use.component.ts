import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';


@Component({
    selector: 'how-to-use',
    styleUrls: ['./how-to-use.component.scss'],
    templateUrl: './how-to-use.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HowToUseComponent implements OnInit, OnDestroy, AfterViewInit {

    /** define si esta habilitado el modal */
    public enableModal: boolean;

    /** activa el control de la salida del modal */
    public outModal: boolean;

    constructor(private el: ElementRef) { 
        this.enableModal = false;
        this.outModal = false;
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

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
        //    input.addEventListener('blur', () => {
        //        input.removeAttribute('placeholder');
        //    });
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
}
