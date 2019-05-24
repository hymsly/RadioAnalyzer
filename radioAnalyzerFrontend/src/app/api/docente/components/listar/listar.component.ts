import { Component, OnInit } from '@angular/core';
import { Docente } from '../../../models/docente';
import { DocenteService } from '../../../services/docente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-admin-listar-docente',
  templateUrl: './listar.component.html',
  providers: [DocenteService]
})

export class ListarDocenteComponent implements OnInit {
  public title: String;
  public docentes: Docente[];
  public url: String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _docenteService: DocenteService
  ) {
    this.title = 'Listado de Docente';
    this.url = GLOBAL.url;
  }
  ngOnInit() {
    this._docenteService.listar().subscribe(
      response => {
      },
      error => {
        console.log(error);
      }
    );
  }

}
