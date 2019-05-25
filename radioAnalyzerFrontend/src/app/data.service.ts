import { Injectable } from '@angular/core';
import { Audio } from './data.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  contacts: Array<Audio>;
  constructor() {
  }
  public getContacts(): Array<Audio> {
    return this.contacts;
  }
  public createContact(contact: Audio) {
    this.contacts.push(contact);
  }
}
