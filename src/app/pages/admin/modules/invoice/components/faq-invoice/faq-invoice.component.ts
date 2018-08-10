import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IFaq, Faq } from '../../models/faq.model';


@Component({
    selector: 'faq-invoice',
    styleUrls: ['./faq-invoice.component.scss'],
    templateUrl: './faq-invoice.component.html',
})
export class FaqInvoiceComponent implements OnInit, OnDestroy, AfterViewInit {
    
    list: Array<IFaq>;

    constructor() { 
        this.list = new Array<IFaq>();
    }

    ngOnInit(): void { 
        this.list.push(new Faq({
            id: '1',
            title: 'What Is an Invoice?',
            description: `
                <p>An invoice, or sales invoices, is a billing document issued by a seller to a customer.</p>\
                <p>The document typically:</p>\
                <ul class="list-unstyled">\
                    <li>Details the contact and billing information</li>\
                    <li>Quantifies an itemized list of goods or services sold</li>\
                    <li>Provides a clear total for the purchase</li>\
                    <li>Defines any discounts or specific payment terms</li>\
                    <li>Contains a unique invoice number and date</li>\
                </ul>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '2',
            title: 'What Is an Invoice Number?',
            description: `
                <p>An invoice number is a unique number that you assign to each new invoice you create. These numbers are then used to organize and track each invoice you send.</p>\
                <p>Your invoice numbers should be assigned in sequential order. For example, your very first invoice might be “invoice no. 1,” followed by “invoice no. 2,” and so on. Invoice numbers aren’t specific to one customer, so you should keep a running total across all of the invoices you send.</p>\
                <p>That being said, some businesses choose to adapt their numbering system to meet their individual needs. This might mean that you choose to incorporate the date into your invoice number for filing purposes, like this: 20172711-001.</p>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '3',
            title: 'How to Make an Invoice',
            description: `
                <ol class="list-unstyled">\
                    <li>Include the word "Invoice."</li>\
                    <li>Assign a unique invoice number and date.</li>\
                    <li>Provide your business name and contact information.</li>\
                    <li>List out the details of the product(s) or service(s) you provided -- include quantity, rates, hours, etc.</li>\
                    <li>Provide the name and contact information of the customer.</li>\
                    <li>Highlight the subtotal.</li>\
                    <li>Specify any payment details or a due date if necessary. </li>\
                </ol>\
                <p>While your invoice details will change slightly depending on whether you are providing a service or a product (e.g., billable hours and rate vs. quantity and cost), the above guidelines serve as best practices for creating a professional invoice.</p>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '4',
            title: 'How to Send an Invoice',
            description: `
                <p>When it comes to actually sending your invoice off to the customer, you have a couple of options:</p>\
                <ol class="list-unstyled">\
                    <li>Send the invoice electronically via email or website.</li>\
                    <li>Send the invoice via postal mail.</li>\
                </ol>\
                <p>When sending an invoice electronically, you may send it through email or directly from your accounting or invoicing software. For many businesses, this is a preferred sending method, as it allows you to deliver invoices to a customer in real time. Invoices that are sent electronically are often paid electronically -- or, less commonly, paid via mail.</p>\
                <p>When sending an invoice by postal mail, make sure that you consider the time it will take for your invoice to arrive. While this tends to be the slower of the two options, many businesses still send invoices via postal mail to meet the needs and demands of their specific audiences.</p>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '5',
            title: 'What’s the Difference Between a Bill and an Invoice?',
            description: `
                <p>The term “invoice” is often adopted in business environments to define a payment request for goods or services purchased by a specific customer. Once the customer receives the invoice, they will typically refer to it as a bill that they now owe to the seller.</p>\
                <p>That being said, it’s not uncommon for the two terms to be used interchangeably, as they both refer to an itemized statement of payment owed to a seller by a buyer.</p>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '6',
            title: 'What Are the Most Popular Types of Invoices?',
            description: `
                <ol class="list-unstyled">\
                    <li>Standard Invoice</li>\
                    <li>Shipping Invoice</li>\
                    <li>Service Invoice</li>\
                    <li>Pro-forma Invoice</li>\
                    <li>Commercial Invoice</li>\
                    <li>Recurring Invoice</li>\
                </ol>\
                <p>The standard invoice is the most common invoice type. The standard invoice includes all of the basic information needed to complete an invoice, including contact information for the buyer and seller, an invoice number, an invoice date, itemized purchases, and a clearly defined subtotal.</p>\
                <p>The shipping invoice serves as a formal payment agreement for goods sold between a seller and a customer. For shipping invoices, information typically includes the cost and number of each item, the subtotal after shipping fees and taxes, the contact information of both parties, as well as an invoice date and number.</p>\
                <p>The service invoice is often used by service businesses that bill customers based on hourly rates for services such as consultants, graphic designers, website developers, lawyers, auto repair technicians, and so on. On service invoices, the subtotal is a reflection of the billable hours invested.</p>\
                <p>The pro-forma invoice can be best compared to a quote or estimation. The pro-forma invoice type is often used as a first step in negotiating a payment agreement and is not considered a true invoice, as it does not demand payment.</p>\
                <p>The commercial invoice is used for customs in instances where goods are being exported across international borders. The commercial invoice contains many of the elements of a standard invoice, in addition to the manufacturing country of the goods, what the items are being used for, the Harmonized System codes (if known), the number of packages and their total weight, and the reason for export.</p>\
                <p>The recurring invoice typically contains a fixed price and is sent on a monthly basis for rented goods or services such as an apartment, business software, cell phone bills, and so on. Recurring invoices will continue to be sent until the customer's contract or subscription expires.</p>\
            `,
            open: false,
        }));
        this.list.push(new Faq({
            id: '7',
            title: 'Where Can I Find Sample Invoices for Inspiration?',
            description: `
                <p>While creating an invoice might not sound like a big branding opportunity, having a well-designed, professional invoice can make a big difference in the eye’s of your customer -- and help you get paid on time.</p>\
                <p>Before making any type of payment, customers want to ensure that they are doing business with a credible, trustworthy company. This means your invoices should be error-free with consistent branding and a clear, itemized list of goods or services.</p>\
                <p>If you need help organizing all of the must-have information that comes on an invoice, download the <a href="/">free invoice templates</a> above.</p>\
            `,
            open: false,
        }));
    }

    ngOnDestroy(): void { }

    ngAfterViewInit(): void { }
}
