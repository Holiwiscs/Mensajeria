import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Region } from 'src/app/models/region';
import { Comuna } from 'src/app/models/comuna';
import { LocationService } from 'src/app/services/location.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {



  nombre: string ="";
  apellidos: string ="";
  nacimiento: string;

  selegenero: string="";


  edad:number = 0;
  correo: string ="";
  contrasena1: string ="";
  contrasena2: string ="";
  

  regiones:Region [] = [];
  comunas:Comuna [] = [];
  seleComuna:number=0;
  seleRegion:number=0;
  disabledComuna:boolean = true;

  

  


  constructor(private router: Router,
              private helper: HelperService,
              private locationService:LocationService,
              private auth: AngularFireAuth,
              private loaderController:LoadingController,
              private storage: StorageService,
              private database: DatabaseService ) 
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



  calcularEdad() {
    if (!this.nacimiento) return; // Si no hay fecha de nacimiento, salir

    const fechaNacimiento = new Date(this.nacimiento);
    const hoy = new Date();
    const edadMilisegundos = hoy.getTime() - fechaNacimiento.getTime();
    this.edad = Math.floor(edadMilisegundos / (1000 * 60 * 60 * 24 * 365.25));
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

    if (this.edad < 18) {
      await this.helper.mostrarAlerta("Debes ser mayor de 18 años", "información");
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
    
  

    try {
      const req = await this.auth.createUserWithEmailAndPassword(this.correo, this.contrasena2);
  
      if (req) {
        console.log("Éxito al crear usuario");
  
        // Enviar correo de verificación
        await req.user.sendEmailVerification();
  
        // Almacenar datos en Firestore
        const id = req.user.uid;
        await this.database.agregarUsuario({
          apellido: this.apellidos,
          comuna: this.seleComuna,
          region: this.seleRegion,
          correo: this.correo,
          edad: this.edad,
          genero: this.selegenero,
          nacimiento: this.nacimiento,
          nombre: this.nombre,
          uid: id,
          photos: []
        });
  
        this.router.navigateByUrl('tipo-registro');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar usuario:', error);
  
      if (error.code === 'auth/email-already-in-use') {
        await this.helper.mostrarAlerta("El correo electrónico ya está en uso.", "Error");
      } else if (error.code === 'auth/weak-password') {
        await this.helper.mostrarAlerta("La contraseña debe tener al menos 6 caracteres.", "Error");
      } else {
        await this.helper.mostrarAlerta("Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.", "Error");
      }
    }
  }
    
  

 
  async back(){
    await this.router.navigateByUrl('login');
  }


 
  
}