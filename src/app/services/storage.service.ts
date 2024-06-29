import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const keyStorageUsuario = "usuarioData";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public correoUsuario: string ="";

  constructor() { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave, value:valor});
  }

  async getUser(){
    const usuario = await this.getItem(keyStorageUsuario);

    if (usuario == null ) {
      return [];

    }

    const usuarios = JSON.parse(usuario);

    if (usuarios) {
      return usuarios;
    }else{
      return [];
    }

  }

  async keepUser(user:any[]){
    const usuarioStorage = await this.getUser();
    for (const i of usuarioStorage){
      if (i) {
        user.push(i);
      }
    }
    this.setItem(keyStorageUsuario, JSON.stringify(user));

  }
  
}
