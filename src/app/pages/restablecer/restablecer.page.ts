import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  correo: string ="";

  constructor(private router: Router,
              private helper: HelperService,
              private auth: AngularFireAuth,
              
  ) { }

  ngOnInit() {
  }

  async restablecer(){
    if(this.correo == ""){
      await this.helper.mostrarAlerta("Debes ingresar un correo válido.","Información");
      return;
    }try{
      await this.auth.sendPasswordResetEmail(this.correo);
      
      await this.helper.mostrarAlerta("Te enviamos un correo electrónico.","Información");
    }catch(error:any) {
      if(error.code == 'auth/invalid-email')
        
        await this.helper.mostrarAlerta("Correo inválido, por favor intente nuevamente","Error");
    }
    
  }

  async back(){
    await this.router.navigateByUrl('login');
  }

}
