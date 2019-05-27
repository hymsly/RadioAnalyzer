import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioListComponent } from './audio-list/audio-list.component';
import { HomeComponent } from './home/home.component';
import { SendAudioComponent } from './send-audio/send-audio.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "audio-list", component: AudioListComponent },
  { path: "upload-audio", component: SendAudioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
