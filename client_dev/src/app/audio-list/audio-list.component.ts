import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.api.getAudios().subscribe((data: any) => {
      this.audios = data.audio;
    })
  }
  public selectAudio(audio) {
    this.selectedAudio = audio;
    if (this.selectedAudio.estado == 2) {
      this.particionado = true;
      this.readyAudio = true;
    } else if (this.selectedAudio.estado == 1) {
      this.readyAudio = true;
      this.particionado = false;
    } else {
      this.readyAudio = false;
      this.particionado = false;
    }
    console.log(this.selectedAudio)
  }
  public Particionar(audio) {
    this.api.particionarAudio(audio.location, audio.duracion * 15, audio.id).subscribe((data: any) => {
      alert(data.message);
      this.router.navigate(['/listar-particion/' + audio.id]);
    });
  }
  public Download(audio) {
    this.api.dowloandAudio(audio.location).subscribe((data: any) => {
      const output: Blob = new Blob([data], { 'type': 'audio/wav' });
      FileSaver.saveAs(output, audio.location + '.wav');
    })
  }
}
