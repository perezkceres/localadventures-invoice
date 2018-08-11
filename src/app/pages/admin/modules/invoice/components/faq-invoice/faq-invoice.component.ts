import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { IFaq } from '../../models/faq.model';
import { FaqService } from '../../services/faq.service';


@Component({
    selector: 'faq-invoice',
    styleUrls: ['./faq-invoice.component.scss'],
    templateUrl: './faq-invoice.component.html',
})
export class FaqInvoiceComponent implements OnInit, OnDestroy, AfterViewInit {
    
    list: Array<IFaq>;

    constructor(protected serv: FaqService) { 
        this.list = new Array<IFaq>();
    }

    ngOnInit(): void { 
        this.serv.findAll().subscribe((data: any) => {
            this.list = data.default;
        });
    }

    ngOnDestroy(): void { }

    ngAfterViewInit(): void { }
}
