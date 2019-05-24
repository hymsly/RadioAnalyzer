import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html'
})

export class ApiComponent {
    public title;
    constructor(
        private _router: Router
    ) {
        this.title = 'title';
    }
}
