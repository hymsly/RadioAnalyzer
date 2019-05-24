import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiRoutingModule } from './api.routing.module';

import { ApiComponent } from './api.component';
import { HomeComponent } from './components/home/home.component';

import { AdminDocenteModule } from './docente/docente.module';


@NgModule({
    declarations: [
        ApiComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ApiRoutingModule,
        AdminDocenteModule
    ],
    exports: [
        ApiComponent,
        HomeComponent,
        AdminDocenteModule
    ],
    providers: []
})
export class ApiModule { }
