import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-rommie',
  templateUrl: './rommie.page.html',
  styleUrls: ['./rommie.page.scss'],
})
export class RommiePage implements OnInit {

  texto: string ="";
  seleVivienda: boolean = false;
  selePago: boolean = false;
  seleMascotas: boolean = false;
  seleEjercicios: boolean = false;
  seleAlimentacion: boolean = false;
  seleCigarro: boolean = false;
  seleComunidad: boolean =false;
  seleAlcohol: boolean =false;
  



  casa:boolean = false;
  depto:boolean = false;
  menos100: boolean = false;
  entre100200: boolean = false;
  entre200300: boolean = false;
  entre300400:boolean = false;
  mas400: boolean = false;
  perro: boolean = false;
  gato: boolean = false;
  aves: boolean = false;
  conejo: boolean = false;
  otraMascota: boolean = false;
  sinMascota: boolean = false;
  siempre: boolean = false;
  aveces: boolean = false;
  casiNunca: boolean = false;
  nunca: boolean = false;
  vegetariano: boolean = false;
  vegano: boolean = false;
  carnivoro: boolean = false;
  pecetariano: boolean = false;
  conAmigos: boolean = false;
  si: boolean = false;
  no: boolean = false;
  



  constructor(private router:Router,
              private storage:StorageService,
              private database:DatabaseService
  ) { }

  ngOnInit() {
  }

  async registrar(){
    var descripcion =
    [
      {
        txt: this.texto,  
        vivienda: this.seleVivienda,
        pago: this.selePago,
        mascota: this.seleMascotas,
        ejercicios: this.seleEjercicios,
        alimentacion: this.seleAlimentacion,
        fuma: this.seleCigarro,
        comunidad: this.seleComunidad,
        alcohol: this.seleAlcohol
      }
    ]
    this.storage.keepUser(descripcion);
    this.database.agregarDescripcion(this.texto,this.seleVivienda,this.selePago,this.seleMascotas,this.seleEjercicios,this.seleAlimentacion,this.seleCigarro,this.seleComunidad,this.seleAlcohol);
    console.log(descripcion);
    this.router.navigateByUrl('menu');
  }




  async back(){
    await this.router.navigateByUrl("tipo-registro");
  }

}
