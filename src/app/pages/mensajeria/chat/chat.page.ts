import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable, switchMap } from 'rxjs';
import { usuarioPf } from 'src/app/models/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatId: string;
  messages$: Observable<any[]>;
  newMessage: string = '';
  currentUserId: string;
  currentUserName: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore, 
    private auth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService  // Asegúrate de inyectar tu DatabaseService
  ) { }

  async ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    const user = await this.auth.currentUser;
    if (user) {
      this.currentUserId = user.uid;
      this.currentUserName = await this.dbService.getUserNameByUid(user.uid); // Asegúrate de que este método funcione correctamente
      this.verifyAccessAndLoadMessages();
    } else {
      console.error('No user logged in');
      this.router.navigateByUrl('/login');
    }
  }

  loadMessages() {
    // Esta línea asume que tienes una estructura de colección de mensajes adecuada
    this.messages$ = this.dbService.getCollection<any>(`Chats/${this.chatId}/messages`);
  }

  async sendMessage(newMessage: string) {
    if (newMessage.trim()) {
      const message = {
        senderId: this.currentUserId,
        senderName: this.currentUserName,
        message: newMessage,  // Aquí usamos el parámetro
        timestamp: new Date()
      };
      await this.dbService.addChatMessage(this.chatId, message);
      this.newMessage = '';  // Limpia el campo de mensaje después de enviar
    }
  }

  verifyAccessAndLoadMessages() {
    // Aquí puedes verificar si el usuario actual tiene acceso a este chat
    this.dbService.getDoc<any>('Chats', this.chatId).subscribe(chat => {
      if (chat.userIds.includes(this.currentUserId)) {
        this.loadMessages();
      } else {
        console.error('Access denied');
        this.router.navigateByUrl('/mensajeria');
      }
    });
  }

}