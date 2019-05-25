import { Component, OnInit } from '@angular/core';
import { Audio } from '../data.model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contact: Audio = new Audio();
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }
  createContact() {
    console.log(this.contact);
    this.dataService.createContact(this.contact);
    this.contact = new Audio();
  }
}
