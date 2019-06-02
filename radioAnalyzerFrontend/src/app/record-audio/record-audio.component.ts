import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.css']
})
export class RecordAudioComponent implements OnInit {
  contacto: FormGroup;
  submitted = false;
  titulo = 'Crear un Formulario con Angular 7 y Bootstrap 4 + Validación';
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.contacto = this.formBuilder.group({
      radio: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }
  get f() { return this.contacto.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }
    this.api.recordAudio(this.contacto.value).subscribe((data: any) => {
      alert(data.message)
    })
  }

}
