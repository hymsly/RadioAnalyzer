import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-send-audio',
  templateUrl: './send-audio.component.html',
  styleUrls: ['./send-audio.component.css']
})
export class SendAudioComponent implements OnInit {
  selectedFile: File = null;
  uploadedPercentage = 0;
  showMessage = false;
  message: String = '';
  constructor(public api: ApiService, private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    this.showMessage = false;
    console.log(this.selectedFile.name);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.api.uploadAudio(fd).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.slimLoadingBarService.start();
          break;
        case HttpEventType.Response:
          this.slimLoadingBarService.complete();
          this.message = "Uploaded Successfully";
          this.showMessage = true;
          break;
        case 1: {
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.uploadedPercentage = event['loaded'] / event['total'] * 100;
            this.slimLoadingBarService.progress = Math.round(this.uploadedPercentage);
          }
          break;
        }
      }
    },
      error => {
        console.log(error);
        this.message = "Something went wrong";
        this.showMessage = true;
        this.slimLoadingBarService.reset();
      });
  }
}