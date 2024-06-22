import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Region } from 'src/app/models/region';
import { Comuna } from 'src/app/models/comuna';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {



  nombre: string ="";
  apellidos: string ="";
  nacimiento: string ="";
  selegenero: boolean = false;
  femenino:boolean = false;
  masculino:boolean = false;;
  noDecirlo:boolean = false;
  otro:boolean = false;
  edad:number = 0;
  correo: string ="";
  contrasena1: string ="";
  contrasena2: string ="";

  regiones:Region [] = [];
  comunas:Comuna [] = [];
  seleComuna:string ="";
  seleRegion:number=0;
  disabledComuna:boolean = true;


  constructor(private router: Router,
              private helper: HelperService,
              private locationService:LocationService) 
  {}

 
  ngOnInit() {
    this.mostrarRegion();
  }
  async mostrarRegion(){
    const reque = await this.locationService.obtenerRegion();
     this.regiones = reque.data;
     console.log(this.regiones);
     
   }

   async mostrarComuna(){
     try{
       const reque = await this.locationService.obtenerComuna(this.seleRegion);
       this.comunas = reque.data;
       this.disabledComuna = false;
    }catch(error:any){
      await this.helper.mostrarAlerta(error.error.msg,"");
     }
     
     
  }

  async registro(){

    if(this.nombre == "") {
      await this.helper.mostrarAlerta("Debes ingresar tu nombre.", "Información");
      return;
    }
    if (this.nombre.length<2){
      await this.helper.mostrarAlerta("Debes ingresar un nombre válido","Información");
      return;
    }

    if(this.apellidos == "") {
      await this.helper.mostrarAlerta("Debes ingresar tu apellido.","Información");
      return;
    }
    if(this.apellidos.length<3){
      await this.helper.mostrarAlerta("Debes ingresar un apellido válido","Información");
      return;
    }

    if(this.nacimiento == "") {
      await this.helper.mostrarAlerta("Debes ingresar tu fecha de nacimiento","Información");
      return;
    }

    if(this.edad<=17){
      await this.helper.mostrarAlerta("Debes ser mayor de 18 años","información");
      return;
    }
    
    if(this.correo == "") {
      await this.helper.mostrarAlerta("Debes ingresar un correo válido.", "Información");
      return;
    }
    

    if(this.contrasena1 == "" ) {
      await this.helper.mostrarAlerta("Debes ingresar una contraseña.", "Información");
      return;
    }

    if(this.contrasena2 == "") {
      await this.helper.mostrarAlerta("Debes confirmar tu contraseña.","Información");
      return;
    }

    if(this.contrasena1 !== this.contrasena2) {
      await this.helper.mostrarAlerta("Las contraseñas no coinciden.", "Información");
      return;
    }

    
    
      await this.router.navigateByUrl('tipo-registro');
    

    
  }

 
  

  async back(){
    await this.router.navigateByUrl('login');
  }

  

  

 
}

