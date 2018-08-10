import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { ActivatedRoute, Router } from '@angular/router';

import { EditComponent } from '../../../../../../core/edit.component';


@Component({
    selector: 'insert-invoice',
    styleUrls: ['./insert-invoice.component.scss'],
    templateUrl: './insert-invoice.component.html',
})
export class InsertInvoiceComponent extends EditComponent<Invoice> implements OnInit, OnDestroy, AfterViewInit {

    constructor(
        protected route: ActivatedRoute, protected router: Router,
    ) {
        super(route, router);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    ngAfterViewInit(): void { }
}
