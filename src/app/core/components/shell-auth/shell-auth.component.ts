import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-shell-auth',
    templateUrl: './shell-auth.component.html',
    styleUrls: ['./shell-auth.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ShellAuthComponent implements OnInit, OnDestroy {

    constructor(changeDetectorRef: ChangeDetectorRef) { }

    public ngOnInit(): void { }

    public ngOnDestroy(): void { }
}
