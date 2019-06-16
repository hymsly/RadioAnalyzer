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
  constructor(public api: ApiService) {
  }

  ngOnInit() {
    this.api.getAudios().subscribe((data: any) => {
      this.audios = data.audio;
    })
  }
  public selectAudio(audio) {
    this.selectedAudio = audio;
    if (audio.estado == 1) {
      this.readyAudio = false;
    } else {
      this.readyAudio = true;
    }
  }
  public Analysis(audio) {
    this.api.analyzeAudio(audio.location, audio.duracion * 15).subscribe((data: any) => {
      console.log(data.message);
      console.log(data.audio);
      console.log(data.split)
    });
  }
  public Download(audio) {
    this.api.dowloandAudio(audio.location).subscribe((data: any) => {
      const output: Blob = new Blob([data], { 'type': 'audio/wav' });
      FileSaver.saveAs(output, audio.location + '.wav');
    })
  }
}
