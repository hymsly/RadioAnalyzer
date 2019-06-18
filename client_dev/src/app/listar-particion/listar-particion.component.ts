import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-listar-particion',
  templateUrl: './listar-particion.component.html',
  styleUrls: ['./listar-particion.component.css']
})
export class ListarParticionComponent implements OnInit {
  
  public particiones;
  public idAudio;
  constructor(public api: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.idAudio = this.route.snapshot.paramMap.get("idAudio");
    this.api.getParticiones(this.idAudio).subscribe((data: any) => {
      this.particiones = data.particiones;
    })
  }

}
