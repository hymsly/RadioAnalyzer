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
  constructor(public api: ApiService) {
  }

  ngOnInit() {
    this.api.getAudios().subscribe((data: any) => {
      this.audios = data.audio;
    })
  }
  public selectAudio(audio) {
    this.selectedAudio = audio;
  }
  public Download(audio) {
    this.api.dowloandAudio(audio.location).subscribe((data: any) => {
      const output: Blob = new Blob([data], { 'type': 'audio/wav' });
      FileSaver.saveAs(output, audio.location + '.wav');
    })
  }
}
