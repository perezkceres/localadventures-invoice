import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'how-to-use',
    styleUrls: ['./how-to-use.component.scss'],
    templateUrl: './how-to-use.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HowToUseComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    ngAfterViewInit(): void { }
}
