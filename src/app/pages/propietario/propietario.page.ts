import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.page.html',
  styleUrls: ['./propietario.page.scss'],
})
export class PropietarioPage implements OnInit {

  texto: string ="";
  seleVivienda: boolean = false;
  selePago: boolean = false;
  seleMascotas: boolean = false;
  seleEjercicios: boolean = false;
  seleAlimentacion: boolean = false;
  seleCigarro: boolean = false;
  seleComunidad: boolean =false;
  seleAlcohol: boolean =false;
  
  id: string;


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
              private database:DatabaseService,
              private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getUid();
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user) {
      this.id = user.uid;
    } else {
      console.log('No user is currently logged in.');
    }
  }





  async registrar(){
    if (!this.id) {
      console.log('User ID is not available.');
      return;
    }

    await this.database.agregarDescripcion({
      texto:this.texto, 
      vivienda:this.seleVivienda, 
      pago:this.selePago, 
      mascota:this.seleMascotas, 
      ejercicios:this.seleEjercicios, 
      alimentacion:this.seleAlimentacion, 
      fuma:this.seleCigarro, 
      comunidad:this.seleComunidad, 
      alcohol:this.seleAlcohol,
      uid: this.id
    });

    this.router.navigateByUrl('menu');
  }


  

}

