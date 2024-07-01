import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { usuarioPf } from 'src/app/models/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { FotografiaService } from 'src/app/services/fotografia.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  fotos : string []=[];
  usuario: usuarioPf = {
    nombre: '',
    apellido: '',
    nacimiento: '',
    edad: 0,
    genero: false, 
    comuna: 0, 
    region: 0, 
    correo: '',
    uid: '',
    photos: []
  };

  id: string;
  
  photos: string[] = [];
  currentUserId: string;
  chunkedPhotos: SafeUrl[][] = [];
  uid: string;


  

  constructor(private router:Router,
              private fotografiaService:FotografiaService,
              private database: DatabaseService,
              private afAuth: AngularFireAuth,
              private sanitizer: DomSanitizer,
            private databaseService:DatabaseService) 
  {this.fotos = this.fotografiaService.fotos;
    
      this.afAuth.currentUser.then(user => {
        if (user) {
          this.currentUserId = user.uid;
          this.loadUserPhotos();
        }
      });
  }

  ngOnInit() {
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user) {
      this.id = user.uid;
    } else {
      console.log('No user is currently logged in.');
    }
  }
    
    

  }
  getInfoUser(){
    const path='Usuarios'
    const id=this.uid;
    this.databaseService.getDoc<usuarioPf>(path,id).subscribe(res => {console.log('datos son =>',res)})

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


