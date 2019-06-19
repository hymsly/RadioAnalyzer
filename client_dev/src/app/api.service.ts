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
  /*AUDIOS */
  public getAudios() {
    return this.httpClient.get(`${this.apiURL}/audio`);
  }
  public getAudioById(id: number) {
    return this.httpClient.get(`${this.apiURL}/id/${id}`);
  }
  public dowloandAudio(file: string) {
    return this.httpClient.get(`${this.apiURL}/audio/download/${file}`, { responseType: 'blob' });
  }
  public particionarAudio(file: string, particiones: number, id: number) {
    return this.httpClient.get(`${this.apiURL}/audio/particionar/${file}`, { params: { split: String(particiones), id: String(id) } });
  }
  public uploadAudio(formData) {
    return this.httpClient.post(`${this.apiURL}/audio/upload`, formData, {
      reportProgress: true, observe: 'events'
    });
  }
  public recordAudio(formData) {
    return this.httpClient.post(`${this.apiURL}/audio/record`, formData);
  }

  /*PARTICIONES */
  public getParticiones(idAudio: number) {
    return this.httpClient.get(`${this.apiURL}/particion/${idAudio}`);
  }
  public analizarParticiones(idAudio: number, idParticion: number) {
    console.log(`${this.apiURL}/particion/${idAudio}/analyzar/${idParticion}`);
    return this.httpClient.get(`${this.apiURL}/particion/${idAudio}/analyzar/${idParticion}`);
  }
}
