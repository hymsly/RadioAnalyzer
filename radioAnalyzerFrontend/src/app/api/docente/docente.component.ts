import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-docente',
    templateUrl: './docente.component.html'
})

export class DocenteComponent {
    public titulo;
    public descripcion: string;
    constructor() {
        this.titulo = 'Docente';
        this.descripcion = 'Bienvenido al menu de administracion de Docentes';
    }
}
