import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/services/i18n/i18n.service';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // ruta default dentro de /auth/
    { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
    { path: 'logout', component: LogoutComponent, data: { title: extract('Logout') } },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
