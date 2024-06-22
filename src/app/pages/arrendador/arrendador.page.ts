import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-arrendador',
  templateUrl: './arrendador.page.html',
  styleUrls: ['./arrendador.page.scss'],
})
export class ArrendadorPage implements OnInit {

  casa: boolean = false;
  departamento: boolean = false;

  privado: boolean = false;
  compartido: boolean = false;

  uno: boolean = false;
  dos: boolean = false;
  tres: boolean = false;
  cuatro: boolean = false;
  cinco: boolean = false;

  perro: boolean = false;
  gato: boolean = false;
  pajaro: boolean = false;
  gallina: boolean = false;
  tortuga: boolean = false;
  hamster: boolean = false;
  conejo: boolean = false;
  sinAnimal:boolean = false;

  unoDeporte: boolean = false;
  dosDeporte: boolean = false;
  tresDeporte: boolean = false;
  cuatroDeporte: boolean = false;

  vegetariano: boolean = false;
  vegano: boolean = false;
  carnivoro: boolean = false;
  pescetariano: boolean = false;

  unoCigarro: boolean = false;
  dosCigarro: boolean = false;
  tresCigarro: boolean = false;
  cuatroCigarro: boolean = false;
  cincoCigarro: boolean = false;
 
 

  constructor(private router: Router,
            
  ) { }

  ngOnInit() {
  }

  checkBoxVivienda(opcion: number) {
    if (opcion == 1){
      this.departamento = false;
    }else{  (opcion == 2)
      this.casa = false;
    }
  }

  checkBoxHabitacion(opcion: number) {
    if (opcion == 1){
      this.privado = false;
    }else{  (opcion == 2)
      this.compartido = false;
    }
  }

  checkBoxPrecio(opcion: number){
    if (opcion == 1){
      this.dos = false;
      this.tres = false;
      this.cuatro = false;
      this.cinco = false;
    }
    if (opcion == 2){
      this.uno = false;
      this.tres = false;
      this.cuatro = false;
      this.cinco = false;
    }
    if (opcion == 3){
      this.uno = false;
      this.dos = false;
      this.cuatro = false;
      this.cinco = false;
    }
    if (opcion == 4){
      this.uno = false;
      this.dos = false;
      this.tres = false;
      this.cinco = false;
    }
    if (opcion == 5){
      this.uno = false;
      this.dos = false;
      this.tres = false;
      this.cuatro = false;
    }
  }

  checkBoxMascota(opcion: number){
    if (opcion == 8){
      this.perro = false;
      this.gato = false;
      this.pajaro = false;
      this.gallina = false;
      this.tortuga = false;
      this.hamster = false;
      this.conejo = false;
    }
  }

  checkBoxDeporte(opcion: number){
    if (opcion == 1){
      this.dosDeporte = false;
      this.tresDeporte = false;
      this.cuatroDeporte = false;
      
    }
    if (opcion == 2){
      this.unoDeporte = false;
      this.tresDeporte = false;
      this.cuatroDeporte = false;
      
    }
    if (opcion == 3){
      this.unoDeporte = false;
      this.dosDeporte = false;
      this.cuatroDeporte = false;
      
    }
    if (opcion == 4){
      this.unoDeporte = false;
      this.dosDeporte = false;
      this.tresDeporte = false;
      
    }
  }

  checkBoxComida(opcion: number){
    if (opcion == 1){
      this.vegano = false;
      this.carnivoro = false;
      this.pescetariano= false;
      
    }
    if (opcion == 2){
      this.vegetariano = false;
      this.carnivoro = false;
      this.pescetariano = false;
      
    }
    if (opcion == 3){
      this.vegetariano = false;
      this.vegano = false;
      this.pescetariano = false;
      
    }
    if (opcion == 4){
      this.vegetariano = false;
      this.vegano = false;
      this.carnivoro = false;
      
    }
  }

  checkBoxCigarro(opcion: number){
    if (opcion == 1){
      this.dosCigarro = false;
      this.tresCigarro = false;
      this.cuatroCigarro = false;
      this.cincoCigarro = false;
      
    }
    if (opcion == 2){
      this.unoCigarro = false;
      this.tresCigarro = false;
      this.cuatroCigarro = false;
      this.cincoCigarro = false;
      
    }
    if (opcion == 3){
      this.unoCigarro = false;
      this.dosCigarro = false;
      this.cuatroCigarro = false;
      this.cincoCigarro = false;
      
    }
    if (opcion == 4){
      this.unoCigarro = false;
      this.dosCigarro = false;
      this.tresCigarro = false;
      this.cincoCigarro = false;
      
    }
    if (opcion == 5){
      this.unoCigarro = false;
      this.dosCigarro = false;
      this.tresCigarro = false;
      this.cuatroCigarro = false;
      
    }
  }




  async registrar(){
    this.router.navigateByUrl('menu');
  }




  async back(){
    await this.router.navigateByUrl("tipo-registro");
  }

}
