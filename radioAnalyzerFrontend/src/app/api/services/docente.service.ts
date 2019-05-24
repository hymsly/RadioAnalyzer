import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Docente } from '../models/docente';

@Injectable()

export class DocenteService {
    public url: String;
    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    listar() {
        return this._http.get(this.url + '/admin-docente');
    }
    getDocente(id) {
        const url = `${this.url}/admin-docente/${id}`;
        return this._http.get(url);
    }

}
