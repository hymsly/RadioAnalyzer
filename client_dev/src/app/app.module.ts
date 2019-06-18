import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SendAudioComponent } from './send-audio/send-audio.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { RecordAudioComponent } from './record-audio/record-audio.component';
import { ListarParticionComponent } from './listar-particion/listar-particion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AudioListComponent,
    HeaderComponent,
    FooterComponent,
    SendAudioComponent,
    RecordAudioComponent,
    ListarParticionComponent
  ],
  imports: [
    BrowserModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
