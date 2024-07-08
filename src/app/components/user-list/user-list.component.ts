import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {

  uid: string; // UID del usuario logueado
  chats$: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private router: Router, private databaseService: DatabaseService) { }

  async ngOnInit() {
    this.uid = await this.databaseService.getUid(); // Obtener el UID desde un servicio
    this.loadChats();
  }

  loadChats() {
    this.chats$ = this.firestore.collection('Chats', ref =>
      ref.where('userIds', 'array-contains', this.uid)
    ).snapshotChanges().pipe(
      switchMap(actions => {
        const chats = actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        const userObservables = chats.map(chat => 
          from(this.getChatUserName(chat.userIds)).pipe(
            map(userName => ({ ...chat, userName }))
          )
        );
        return combineLatest(userObservables);
      })
    );
  }

  openChat(chatId: string) {
    this.router.navigate([`/mensajeria/chat/${chatId}`]); // Asegúrate de que chatId sea el ID correcto del chat
  }

  async getChatUserName(userIds: string[]): Promise<string> {
    const otherUserId = userIds.find(uid => uid !== this.uid);
    const userName = await this.databaseService.getUserNameByUid(otherUserId);
    return userName;
  }


  // // // uid: string; // UID del usuario logueado
  // // // chats$: Observable<any[]>;

  // // // constructor(private firestore: AngularFirestore, private router: Router, private databaseService: DatabaseService) { }

  // // // async ngOnInit() {
  // // //   this.uid = await this.databaseService.getUid(); // Obtener el UID desde un servicio
  // // //   this.loadChats();
  // // // }

  // // // loadChats() {
  // // //   // Cargar solo los chats que incluyan el UID del usuario logueado
  // // //   this.chats$ = this.firestore.collection('Chats', ref =>
  // // //     ref.where('userIds', 'array-contains', this.uid)
  // // //   ).snapshotChanges().pipe(
  // // //     map(actions => actions.map(a => {
  // // //       const data = a.payload.doc.data() as any;
  // // //       const id = a.payload.doc.id;
  // // //       return { id, ...data };
  // // //     }))
  // // //   );
  // // // }

  // // // openChat(chatId: string) {
  // // //   this.router.navigate([`/mensajeria/chat/${chatId}`]); // Asegúrate de que chatId sea el ID correcto del chat
  // // // }


}
