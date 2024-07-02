import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { descripcionU } from 'src/app/models/descripcion';
import { usuarioPf } from 'src/app/models/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { FotografiaService } from 'src/app/services/fotografia.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  fotos : string []=[];
  usuario: any;
  userInfo: usuarioPf;

  info: usuarioPf = null;

  id: string;
  
  
  photos: string[] = [];
  currentUserId: string;
  chunkedPhotos: SafeUrl[][] = [];
  uid: string;


  

  constructor(private router:Router,
              private fotografiaService:FotografiaService,
              private database: DatabaseService,
              private auth: AngularFireAuth,
              private alertController: AlertController
             
  ) 
  {this.fotos = this.fotografiaService.fotos;
    
      this.auth.currentUser.then(user => {
        if (user) {
          this.currentUserId = user.uid;
          this.loadUserPhotos();
        }
      });
  }

  ngOnInit() {
    this.getUid();
  }
  
  async alertaEditar(){
    var alerta = await this.alertController.create({
      cssClass:"my-custom-class", 
      header:'Editar edad',
      inputs:[
        {
          name: 'edad',
          type: 'number',
          placeholder: 'Ingresa tu edad'
        },
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () =>{
            console.log("confirmo cancelacion");
          }
        },{
          text: 'Ok',
          handler: () =>{
            console.log("confirmar ok");
          }
        }

      ]
  
  });
  await alerta.present();
}

saveEdad(edadInput: number){
  const path= 'Usuario';
  const id = this.uid;
  const updateDoc = {
    edad: edadInput
  }; 
  
}

  async getUid(){
    const uidd = await this.database.getUid();
    if(uidd){
      this.uid = uidd;
      console.log(' Mi uid ->', this.uid);
      this.getInfoDescripcion();
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }

  getInfoDescripcion(){
    const path = 'Descripcion'
    const id = this.uid;
    this.database.getDoc<descripcionU>(path, id).subscribe(res =>{
      console.log("Las descripciones son estas -> ", res)
    })
  }


  getInfoUser(){
    const path = 'Usuario';
    const id = this.uid;
    this.database.getDoc<usuarioPf>(path, id).subscribe(res => {
      if(res){
        this.userInfo = res;
        this.info = res;
        console.log("Los datos son -> ", this.userInfo);
      } else{
        console.log("No se encontraron datos para el usuario con UID ", id);
      }
    });
  }
    
  loadUserPhotos() {
    this.database.getDoc<any>('Usuario', this.currentUserId).subscribe(userData => {
      this.photos = userData?.photos || [];
    });
  }

  async uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const photoIndex = this.photos.length;
      if (photoIndex < 6) {
        const photoUrl = await this.database.uploadPhoto(file, this.currentUserId, photoIndex);
        this.photos.push(photoUrl);

        this.database.getDoc<any>('Usuario', this.currentUserId).subscribe(async userData => {
          if (userData) {
            // Si el documento existe, actualízalo
            await this.database.updateUserProfilePhotos(this.currentUserId, this.photos);
          } else {
            // Si el documento no existe, créalo
            await this.database.setDoc('Usuario', this.currentUserId, { photos: this.photos });
          }
        });
      } else {
        console.log('No puedes subir más de 6 fotos.');
      }
    }
  }

chunkPhotos() {
  this.chunkedPhotos = [];
  for (let i = 0; i < this.photos.length; i += 2) {
    this.chunkedPhotos.push(this.photos.slice(i, i + 2));
  }
}

async deletePhoto(photoUrl: string, index: number) {
  try {
    await this.database.deletePhoto(photoUrl, this.currentUserId, index);
    this.photos.splice(index, 1);
    await this.database.updateUserProfilePhotos;
    console.log('Foto eliminada con éxito');
  } catch (error) {
    console.error('Error al eliminar la foto:', error);
  }
}

async saveProfile() {
  try {
    await this.database.setDoc('Usuario', this.currentUserId, this.usuario);
    console.log('Perfil guardado con éxito');
  } catch (error) {
    console.error('Error al guardar el perfil:', error);
  }
}


  async tomarFoto(){
    await this.fotografiaService.addNuevaFoto();
  }

  async back(){
    await this.router.navigateByUrl("menu");
  }

}


