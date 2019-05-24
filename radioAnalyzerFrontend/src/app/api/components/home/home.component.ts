import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    public titulo;
    public descripcion;
    public nombreCompleto: string;
    constructor() {
        this.titulo = 'SIGA';
        this.descripcion = 'Sistema Integrado de Gestión Academica';
        const user = JSON.parse(localStorage.getItem('user'));
        this.nombreCompleto = user.nombres + ' ' + user.apellidos;
    }
}
