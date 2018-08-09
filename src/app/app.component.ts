import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor( private router: Router, private titleService: Title) { }

    public ngOnInit(): void {
        this.subscribeToRouterEvents();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    /** Google Analytics */
    private static trackPageView(event: NavigationEnd) {
        // (<any>window).ga('set', 'page', event.urlAfterRedirects);
        // (<any>window).ga('send', 'pageview');
    }

    private subscribeToRouterEvents() {
        this.router.events.pipe(filter(event => event instanceof ActivationEnd || event instanceof NavigationEnd), takeUntil(this.unsubscribe$)).subscribe(event => {
            if (event instanceof ActivationEnd) {
                this.setPageTitle(event);
            }

            if (event instanceof NavigationEnd) {
                AppComponent.trackPageView(event);
            }
        });
    }

    private setPageTitle(event: ActivationEnd) {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
            lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
            title ? `${title} - ${environment.appName}` : environment.appName
        );
    }
}
