import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  uid: string; // UID del usuario logueado
  matches: any[] = [];
  chats$: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private router: Router, private databaseService: DatabaseService) { }

  async ngOnInit() {
    this.uid = await this.databaseService.getUid(); // Obtener el UID desde un servicio
    this.loadMatches();

    this.chats$ = this.firestore.collection('Chats').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }; // Asegúrate de incluir todos los datos
      }))
    );
  }

  openChat(chatId: string) {
    this.router.navigate([`/mensajeria/chat/${chatId}`]); // Asegúrate de que chatId sea el ID correcto del chat
  }

  loadMatches() {
    // Cargar solo los chats que incluyan el UID del usuario logueado
    this.firestore.collection('Chats', ref => 
      ref.where('userIds', 'array-contains', this.uid)
    ).valueChanges({ idField: 'chatId' }).subscribe(matches => {
      this.matches = matches;
    });
  }

}
