import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { GuestRoute } from './core/services/route/guest.route.service';
import { AuthRoute } from './core/services/route/auth.route.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    
    GuestRoute.withShell([
        { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ]),

    AuthRoute.withShell([
        { path: 'invoice', loadChildren: './pages/invoice/invoice.module#InvoiceModule' }
    ]),
    
    // Fallback when no prior route is matched
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }