import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteComponent } from './docente.component';
import { ListarDocenteComponent } from './components/listar/listar.component';

const docenteRoutes: Routes = [
    {
        path: 'api/admin-docente',
        component: DocenteComponent,
        children: [
            {
                path: 'listar',
                component: ListarDocenteComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(docenteRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AdminDocenteRoutingModule { }
