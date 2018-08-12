import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        CoreModule,

        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
