import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {
  public audios;
  public selectedAudio;
  public readyAudio = false;
  public particionado = false;
  constructor(public api: ApiService) {
  }

  ngOnInit() {
    this.api.getAudios().subscribe((data: any) => {
      this.audios = data.audio;
    })
  }
  public selectAudio(audio) {
    this.selectedAudio = audio;
    if (audio.estado != 0) {
      this.readyAudio = false;
    } else {
      this.readyAudio = true;
    }
  }
  public Particionar(audio) {
    this.api.particionarAudio(audio.location, audio.duracion * 15,audio.id).subscribe((data: any) => {
      console.log(data.message);
    });
  }
  public Download(audio) {
    this.api.dowloandAudio(audio.location).subscribe((data: any) => {
      const output: Blob = new Blob([data], { 'type': 'audio/wav' });
      FileSaver.saveAs(output, audio.location + '.wav');
    })
  }
}
