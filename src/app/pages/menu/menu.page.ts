import { Component, OnInit,AfterViewInit, viewChildren, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Gesture, GestureController, IonCard } from '@ionic/angular';
import { usuarioPf } from 'src/app/models/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { descripcionU } from 'src/app/models/descripcion';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  startX:number=0;
  endX:number=0;

  users: any[] = [];
  descripciones: any[] = [];
  // Array para almacenar los usuarios obtenidos de Firestore
  private subscriptions: Subscription[] = [];

  uid: string = null;
  infoUser: usuarioPf = null;
  infoDescri: descripcionU = null;
  

  constructor(private gestureCtrl: GestureController,
              private helper:HelperService,
              private auth: AngularFireAuth,
              private router: Router,
              private dataBase: DatabaseService,
              private firestore: AngularFirestore

            ) { }

  async ngOnInit() {
    console.log("Estoy en mi perfil")
    this.getUid();
    
  }

  ngOnDestroy() {
    this.getUid();
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUsuarios(){
    
  }
  
 
  touchStart(evt: any) {
    this.startX = evt.touches[0].pageX;
  }

  touchMove(evt: any, index: number) {
    let deltaX = this.startX - evt.touches[0].pageX;
    let deg = deltaX / 10;
    this.endX = evt.touches[0].pageX;

    let cardElement = document.getElementById('card-' + index) as HTMLStyleElement;

    if (cardElement) {
      cardElement.style.transform = 'translateX(' + -deltaX + 'px) rotate(' + -deg + 'deg)';
    } else {
      console.error('Elemento card-' + index + ' no encontrado.');
      return;
    }

    let rejectIcon = document.getElementById('reject-icon') as HTMLStyleElement;
    let acceptIcon = document.getElementById('accept-icon') as HTMLStyleElement;

    if (rejectIcon && acceptIcon) {
      if (this.endX - this.startX < 0) {
        rejectIcon.style.opacity = String(deltaX / 100);
      } else {
        acceptIcon.style.opacity = String(-deltaX / 100);
      }
    } else {
      console.error('Elementos reject-icon o accept-icon no encontrados.');
    }
  }


  touchEnd(index: number) {
    if (this.endX > 0) {
      let finalX = (this.endX = this.startX);
      if (finalX > -100 && finalX < 100) {
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '.3s';
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translate(0px) rotate(0deg)';
        setTimeout(() => {
          (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '0s';
        }, 350);
      } else if (finalX <= -100) {
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '1s';
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translateX(-1000px) rotate(-30deg)';
        setTimeout(() => {
          this.users.splice(index, 1);
        }, 100);
      } else if (finalX >= 100) {
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '1s';
        (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translateX(-1000px) rotate(-30deg)';
        setTimeout(() => {
          this.handleLike(this.users[index].uid); // Maneja el like
          this.users.splice(index, 1);
        }, 100);
      }
      this.startX = 0;
      this.endX = 0;
      (<HTMLStyleElement>document.getElementById('reject-icon')).style.opacity = '0';
      (<HTMLStyleElement>document.getElementById('accept-icon')).style.opacity = '0';
    }
  }
  
// // // touchEnd(index: number) {
// // //   if (this.endX > 0) {
// // //     let finalX = (this.endX = this.startX);
// // //     if (finalX > -100 && finalX < 100) {
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '.3s';
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translate(0px) rotate(0deg)';
// // //       setTimeout(() => {
// // //         (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '0s';
// // //       }, 350);
// // //     } else if (finalX <= -100) {
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '1s';
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translateX(-1000px) rotate(-30deg)';
// // //       setTimeout(() => {
// // //         this.users.splice(index, 1);
// // //       }, 100);
// // //     } else if (finalX >= 100) {
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transition = '1s';
// // //       (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = 'translateX(-1000px) rotate(-30deg)';
// // //       setTimeout(() => {
// // //         this.users.splice(index, 1);
// // //       }, 100);
// // //     }
// // //     this.startX = 0;
// // //     this.endX = 0;
// // //     (<HTMLStyleElement>document.getElementById('reject-icon')).style.opacity = '0';
// // //     (<HTMLStyleElement>document.getElementById('accept-icon')).style.opacity = '0';
// // //   }
// // // }

  async getUid(){
    const uidd = await this.dataBase.getUid();
    if(uidd){
      this.uid = uidd;
      console.log(' Mi uid ->', this.uid);
      this.loadDescripcionesFromFirestore(); // Cargar descripciones desde Firestore
      this.loadUsersFromFirestore(); // Cargar usuarios desde Firestore
      this.getInfoUser();
      this.getInfoDescripcion();
    } else {
      console.log('no existe uid');
    }
  }

  getInfoDescripcion(){
    const path = 'Descripcion'
    const id = this.uid;
    this.dataBase.getDoc<descripcionU>(path, id).subscribe(descri =>{
      if(descri){
        this.infoDescri = descri;
      }
      console.log("Las descripciones son estas -> ", descri)
    })
  }


  getInfoUser(){
    const path = 'Usuario';
    const id = this.uid;
    this.dataBase.getDoc<usuarioPf>(path, id).subscribe(res => {
      if(res){
        this.infoUser = res;
        console.log("Los datos son -> ", this.infoUser);
        this.loadUsersFromFirestore(); 
      } else{
        console.log("No se encontraron datos para el usuario con UID ", id);
      }
    });

    }
    
  async cerrarSesion(){
    var salir = await this.helper.Confirmar("¿Desea cerrar sesión?","Salir","Cancelar");
    if(salir == true){
      await this.auth.signOut();
      await this.router.navigateByUrl("login");
    }
  
  }

  async terminos(){
    await this.router.navigateByUrl('terminos');
  }

  async perfil(){
    await this.router.navigateByUrl('perfil');
  }

  async mensajeria(){
    await this.router.navigateByUrl('chat');
  }
  
  async soporte(){
    await this.router.navigateByUrl('soporte');
  }


  loadUsersFromFirestore() {
    this.subscriptions.push(
      this.firestore.collection('Usuario').valueChanges().subscribe((users: any[]) => {
        if (this.infoUser) {
          if (this.infoUser.rol == 'Roommie') {
            this.users = users.filter(user => user.uid !== this.uid && user.rol === 'Dueño de casa');
          } else if (this.infoUser.rol == 'Dueño de casa') {
            this.users = users.filter(user => user.uid !== this.uid && user.rol === 'Roommie');
          }
          console.log('Usuarios cargados desde Firestore (filtrados):', this.users);
        } else {
          console.error('infoUser es null. No se puede filtrar usuarios.');
        }
      })
    );
  }
  


  loadDescripcionesFromFirestore() {
    this.subscriptions.push(
      this.firestore.collection('Descripcion').valueChanges().subscribe((descriptions: any[]) => {
        this.descripciones = descriptions;
        console.log('Descripciones cargadas desde Firestore:', this.descripciones);
      })
    );
  }
  
  getDescripcionesByUid(uid: string) {
    return this.descripciones.filter(descripcion => descripcion.uid === uid);
  }

  async handleLike(likedUserUid: string) {
    try {
      const currentUserUid = this.uid;
  
      // Guardar el "like" en Firestore
      await this.dataBase.addLikeWithId(currentUserUid, likedUserUid);
  
      // Verificar si hay match
      const matchSnapshot = await this.firestore.collection('Likes', ref =>
        ref.where('userId', '==', likedUserUid).where('likedUserId', '==', currentUserUid)
      ).get().toPromise();
  
      if (!matchSnapshot.empty) {
        // Hay un match
        await this.dataBase.addMatchWithId(currentUserUid, likedUserUid);
  
        // Crear un chat
        const chatId = this.firestore.createId();
        await this.dataBase.addChatWithId(chatId, currentUserUid, '¡Hola! Empecemos a chatear.');
  
        // Redireccionar a la página de mensajería con el chat abierto
        this.router.navigateByUrl(`/chat/${chatId}`);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  }

  // // // async handleLike(likedUserUid: string) {
  // // //   try {
  // // //     const currentUserUid = this.uid;

  // // //     // Guardar el "like" en Firestore
  // // //     await this.dataBase.addLikeWithId(currentUserUid, likedUserUid);

  // // //     // Verificar si hay match
  // // //     const matchSnapshot = await this.firestore.collection('Likes', ref =>
  // // //       ref.where('userId', '==', likedUserUid).where('likedUserId', '==', currentUserUid)
  // // //     ).get().toPromise();

  // // //     if (!matchSnapshot.empty) {
  // // //       // Hay un match
  // // //       await this.dataBase.addMatchWithId(currentUserUid, likedUserUid);

  // // //       // Crear un chat
  // // //       const chatId = this.firestore.createId();
  // // //       await this.dataBase.addChatWithId(chatId, currentUserUid, '¡Hola! Empecemos a chatear.');

  // // //       // Redireccionar a la página de mensajería con el chat abierto
  // // //       this.router.navigateByUrl(`/chat/${chatId}`);
  // // //     }
  // // //   } catch (error) {
  // // //     console.error('Error handling like:', error);
  // // //   }
  // // // }

}
