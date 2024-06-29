import { Injectable } from '@angular/core';
import {  Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotografiaService {

  fotos: string []=[];

  constructor() { }

  async addNuevaFoto(){
    const foto = await Camera.getPhoto({
      resultType : CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    if (foto.webPath){
      this.fotos.unshift(foto.webPath);
    }
  }
}
