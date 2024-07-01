import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, finalize } from 'rxjs';
import { usuarioPf } from '../models/usuario';
import { descripcionU } from '../models/descripcion';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore,
              private authfirebase: AngularFireAuth,
              private storage: AngularFireStorage // Agrega esto
  ) { }


  async agregarUsuario(usuario:usuarioPf){
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
      };
      await this.firestore.collection('Usuario').doc(usuario.uid).set(data);  
    // // // await this.firestore.collection('Usuario').add(data);
    // // // await this.firestore.collection('Usuario').get;
  };

  async agregarDescripcion(descripcion:descripcionU) {
    const data = {
      "texto": descripcion.texto,
      "vivienda": descripcion.vivienda,
      "pago": descripcion.pago,
      "mascota": descripcion.mascota,
      "ejercicios": descripcion.ejercicios,
      "alimentacion": descripcion.alimentacion,
      "fuma": descripcion.fuma,
      "comunidad": descripcion.comunidad,
      "alcohol": descripcion.alcohol,
      "uid": descripcion.uid,

    }
    await this.firestore.collection('Descripcion').doc(descripcion.uid).set(data);  
    // // // await this.firestore.collection('Descripcion').add(data);
    
  }

  async getUid() {
    const user = await this.authfirebase.currentUser;
    if (user) {
      console.log('UID obtenido:', user.uid); // Agrega esta línea para depuración
      return user.uid;
    } else {
      console.log('No se pudo obtener el UID'); // Agrega esta línea para depuración
      return null;
    }
  }
  

  // // // async getUid() {
  // // //   const user = this.authfirebase.currentUser;
  // // //   if (user) {
  // // //     return (await user).email;
  // // //   } else {
  // // //     return null;
  // // //   }
  // // // }
  uploadPhoto(file: File, userId: string, photoIndex: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `users/${userId}/photo_${photoIndex}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            resolve(url);
          }, err => reject(err));
        })
      ).subscribe();
    });
  }

  async deletePhoto(photoUrl: string, userId: string, photoIndex: number): Promise<void> {
    const filePath = `users/${userId}/photo_${photoIndex}`;
    await this.storage.refFromURL(photoUrl).delete().toPromise();
  }

  updateUserProfilePhotos(userId: string, photoUrls: string[]): Promise<void> {
    return this.firestore.collection('Usuario').doc(userId).update({ photos: photoUrls });
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();

  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  stateUser() {
    return this.authfirebase.authState;
  }

  // Método para establecer un documento
  async setDoc(collectionPath: string, docId: string, data: any): Promise<void> {
    try {
      await this.firestore.collection(collectionPath).doc(docId).set(data);
    } catch (error) {
      console.error('Error setting document: ', error);
      throw error;
    }
  }
}