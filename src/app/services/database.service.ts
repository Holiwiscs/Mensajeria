import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, finalize, from } from 'rxjs';
import { usuarioPf } from '../models/usuario';
import { descripcionU } from '../models/descripcion';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore,
              private authfirebase: AngularFireAuth,
              private storage: AngularFireStorage
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
        "rol": usuario.rol,
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

  updateDoc(path: string, id: string, data: any){
    return this.firestore.collection(path).doc(id).update(data);
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

  // Función para añadir un "like" con un ID personalizado
  addLikeWithId(userId: string, likedUserId: string) {
    const likeId = `${userId}_${likedUserId}`; // Ejemplo de ID personalizado
    const like = {
      userId,
      likedUserId};
    return this.firestore.collection('Likes').doc(likeId).set(like);
  }

  // Función para añadir un "match" con un ID personalizado
  addMatchWithId(user1Id: string, user2Id: string) {
    const matchId = `${user1Id}_${user2Id}`; // Ejemplo de ID personalizado
    const match = {
      user1Id,
      user2Id,
    };
    return this.firestore.collection('Matches').doc(matchId).set(match);
  }

  // Función para añadir un "chat" con un ID personalizado
  addChatWithId(matchId: string, userId: string, message: string) {
    const chatId = `${matchId}_${new Date().getTime()}`; // Ejemplo de ID personalizado
    const chat = {
      matchId,
      userId,
      message,
    };
    return this.firestore.collection('Chats').doc(chatId).set(chat);
  }

  async getUserNameByUid(uid: string): Promise<string> {
    const userDoc = await this.firestore.collection('Usuario').doc(uid).get().toPromise();
    if (userDoc.exists) {
      const userData = userDoc.data() as usuarioPf;
      return userData.nombre;
    }
    return 'Unknown';
  }

  async addChatMessage(chatId: string, message: any): Promise<void> {
    try {
      await this.firestore.collection(`Chats/${chatId}/messages`).add(message);
    } catch (error) {
      console.error('Error adding chat message:', error);
      throw error;
    }
  }

  addUserNamesToMessages(messages: any[]): Observable<any[]> {
    return from(Promise.all(messages.map(async message => {
      const userName = await this.getUserNameByUid(message.senderUid);
      return { ...message, senderName: userName };
    })));
  }
  
  async solicitudSoporte(texto:string){

    const data = {
      "texto": texto
    }
    await this.firestore.collection('solicitud').add(data);

    
  }

  getMatchesForUser(userId: string): Observable<any[]> {
    return this.firestore.collection('Matches', ref =>
      ref.where('user1Id', '==', userId).where('user2Id', '==', userId)
    ).valueChanges();
  }
  

}