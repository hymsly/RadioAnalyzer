import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

import { Audio } from './audio';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) { }

  public getAudios() {
    console.log(`${this.apiURL}/audio`);
    return this.httpClient.get(`${this.apiURL}/audio`);
  }
  public getAudioById(id: number) {
    return this.httpClient.get(`${this.apiURL}/id/${id}`);
  }
  public dowloandAudio(file: string) {
    return this.httpClient.get(`${this.apiURL}/audio/download/${file}`, { responseType: 'blob' });
  }
}
