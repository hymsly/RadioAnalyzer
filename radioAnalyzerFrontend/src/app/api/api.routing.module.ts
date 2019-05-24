import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiComponent } from './api.component';
import { HomeComponent } from './components/home/home.component';
import { DocenteComponent } from './docente/docente.component';

// docente
import { ListarDocenteComponent } from './docente/components/listar/listar.component';

const adminRoutes: Routes = [
    {
        path: 'api',
        component: ApiComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'admin-docente',
                component: DocenteComponent,
                children: [
                    {
                        path: 'listar',
                        component: ListarDocenteComponent
                    },
                    {
                        path: '**',
                        redirectTo: '',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ApiRoutingModule { }
