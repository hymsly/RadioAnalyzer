import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public apiURL: String = (new Global).url;
  constructor(private httpClient: HttpClient) {
  }

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
  public analyzeAudio(file: string, particiones: number) {
    return this.httpClient.get(`${this.apiURL}/audio/analizar/${file}`, { params: { split: String(particiones) } });
  }
  public uploadAudio(formData) {
    return this.httpClient.post(`${this.apiURL}/audio/upload`, formData, {
      reportProgress: true, observe: 'events'
    });
  }
  public recordAudio(formData) {
    return this.httpClient.post(`${this.apiURL}/audio/record`, formData);
  }
}
