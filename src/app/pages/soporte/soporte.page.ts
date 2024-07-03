import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  texto: string ="";

  constructor(private helper: HelperService,
              private database: DatabaseService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  async solicitud(){
    await this.database.solicitudSoporte(this.texto);
    await this.helper.mostrarAlerta("Solicitud enviada con éxito. Pronto te contactaremos vía correo.","Mensaje");
    await this.router.navigateByUrl("menu");
  }

  async back(){
    await this.router.navigateByUrl('menu');
  }

}