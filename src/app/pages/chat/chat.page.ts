import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatId: string;
  currentUserUid: string;
  messageText: string;
  messages$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private dataBase: DatabaseService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    this.getCurrentUserUid();
    this.loadMessages();
  }

  async getCurrentUserUid() {
    const user = await this.auth.currentUser;
    if (user) {
      this.currentUserUid = user.uid;
    }
  }

  loadMessages() {
    this.messages$ = this.dataBase.getCollection(`Chats/${this.chatId}/messages`);
  }

  async sendMessage() {
    try {
      if (this.messageText.trim() === '') return;

      await this.dataBase.addChatMessage(this.chatId, {
        senderUid: this.currentUserUid,
        message: this.messageText,
        timestamp: new Date()
      });

      // Limpiar el campo de mensaje después de enviar
      this.messageText = '';

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

}

