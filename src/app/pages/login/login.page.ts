import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router,
              private helper: HelperService,
              private auth: AngularFireAuth,
              private loadercontroller: LoadingController
  ) { }

  ngOnInit() {
  }


  async Login(){

    const cargando = await this.helper.MostrarCarga("Cargando...");

    if(this.usuario == ""){
      
      await this.helper.mostrarAlerta("Debes ingresar un correo","Información");
      await cargando.dismiss();
      return;
      
    }

    if(this.contrasena == ""){
      
      await this.helper.mostrarAlerta("Debes ingresar una contraseña","Información");
      await cargando.dismiss();
      return;
    
    }

    try{
      const req = await this.auth.signInWithEmailAndPassword(this.usuario,this.contrasena);
      await this.router.navigateByUrl('menu');
      await cargando.dismiss();
    }catch(error:any) {

    
      if(error.code == 'auth/invalid-email'){
        await cargando.dismiss();
        await this.helper.mostrarAlerta("El correo no es válido","Error");
        
      }

      if(error.code == 'auth/wrong-password'){
        //await cargando.dismiss();
        await this.helper.mostrarAlerta("La contraseña ingresada no es válida","Error");
        
      }
      await cargando.dismiss();
      return;
    }
  }
    
    
    
    
  

  async registrateAqui(){
    await this.router.navigateByUrl('registro');

  }

  async restContrasena(){
    await this.router.navigateByUrl('restablecer');

  }



}
