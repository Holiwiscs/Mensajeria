import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { usuarioPf } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore,
    private authfirebase: AngularFireAuth,
  ) { }


  async agregarUsuario(usuario:usuarioPf)
     {
      const data = {
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "nacimiento": usuario.nacimiento,
        "edad": usuario.edad,
        "genero": usuario.genero,
        "comuna": usuario.comuna,
        "region": usuario.region,
        "correo": usuario.correo,
        "uid": usuario.uid
      }
    await this.firestore.collection('Usuario').add(data);
    await this.firestore.collection('Usuario').get
  };

  async agregarDescripcion(texto: string,
    vivienda: boolean,
    pago: boolean,
    mascota: boolean,
    ejercicios: boolean,
    alimentacion: boolean,
    fuma: boolean,
    comunidad: boolean,
    alcohol: boolean
  ) {
    const data = {
      "texto": texto,
      "vivienda": vivienda,
      "pago": pago,
      "mascota": mascota,
      "ejercicios": ejercicios,
      "alimentacion": alimentacion,
      "fuma": fuma,
      "comunidad": comunidad,
      "alcohol": alcohol

    }
  
    await this.firestore.collection('Descripcion').add(data);
    
  }
  

  async getUid() {
    const user = await this.authfirebase.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }

  createDoc(data: any, path: string, id: string) {

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string): Observable<tipo[]> {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string): Observable<tipo> {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  stateUser() {
    return this.authfirebase.authState;
  }

}