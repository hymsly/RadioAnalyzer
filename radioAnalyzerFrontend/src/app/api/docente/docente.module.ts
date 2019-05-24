import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDocenteRoutingModule } from './docente.routing.module';

import { DocenteComponent } from './docente.component';
import { ListarDocenteComponent } from './components/listar/listar.component';

@NgModule({
    declarations: [
        DocenteComponent,
        ListarDocenteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdminDocenteRoutingModule
    ],
    exports: [
        DocenteComponent,
        ListarDocenteComponent
    ],
    providers: []
})
export class AdminDocenteModule { }
