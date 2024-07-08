
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {

  matches$: Observable<any[]>;
  router: any;
  newMessage: string = '';
  uid: string;

  constructor(
    private route: ActivatedRoute,
    private dataBase: DatabaseService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.loadMatches();
    this.getUid(); // Obtén el UID del usuario
  }

  loadMatches() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.matches$ = this.dataBase.getMatchesForUser(userId);
  }

  async sendMessage() {
    try {
      if (this.newMessage.trim() === '') return;
  
      const chatId = '...'; // Aquí debes obtener el chatId, por ejemplo, de una función o propiedad de la página
      await this.firestore.collection('Chats').doc(chatId).collection('messages').add({
        text: this.newMessage,
        sender: this.uid, // Asegúrate de que this.uid esté correctamente definido y tenga el valor correcto
        timestamp: new Date()
      });
  
      this.newMessage = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  openChat(chatId: string) { // Añadir el método openChat
    this.router.navigateByUrl(`/chat/${chatId}`);
  }

  async getUid() { // Añadir el método getUid para obtener el UID
    this.uid = await this.dataBase.getUid();
  }

}




// import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// import { ModalController, PopoverController } from '@ionic/angular';

// import { HelperService } from 'src/app/services/helper.service';

// @Component({
//   selector: 'app-mensajeria',
//   templateUrl: './mensajeria.page.html',
//   styleUrls: ['./mensajeria.page.scss'],
// })
// export class MensajeriaPage implements OnInit {

//   @ViewChild('new_chat') modal: ModalController;
//   @ViewChild('popover') popover: PopoverController;

  
//   segment = 'chats';
//   open_new_chat = false;
//   users = [
//     {id: 1, name: 'Felipe', photo: 'https://i.pravatar.cc/385'},
//     {id: 2, name: 'Paz', photo: 'https://i.pravatar.cc/386'},
//   ];
//   chatRooms = [
//     {id: 1, name: 'Felipe', photo: 'https://i.pravatar.cc/385'},
//     {id: 2, name: 'Paz', photo: 'https://i.pravatar.cc/386'},
//   ];

//   constructor(
//               private router: Router
//   ) { }

//   ngOnInit() {
//   }

//   logout(){
//     this.popover.dismiss();
//   }

//   onSegmentChanged(event:any){

//   }

//   newChat(){
//     this.open_new_chat = true;
//   }

//   onWillDismiss(event: any){

//   }

//   cancelar(){
//     this.modal.dismiss();
//     this.open_new_chat = false;
//   }

//   startChat(item){

//   }
  
//   getChat(item){
//     this.router.navigate(['/','mensajeria','chats', item?.id]);
//   }
// }
