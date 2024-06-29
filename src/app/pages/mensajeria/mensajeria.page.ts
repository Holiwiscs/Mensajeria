import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;

  
  segment = 'chats';
  open_new_chat = false;
  users = [
    {id: 1, name: 'Felipe', photo: 'https://i.pravatar.cc/385'},
    {id: 2, name: 'Paz', photo: 'https://i.pravatar.cc/386'},
  ];
  chatRooms = [
    {id: 1, name: 'Felipe', photo: 'https://i.pravatar.cc/385'},
    {id: 2, name: 'Paz', photo: 'https://i.pravatar.cc/386'},
  ];

  constructor(
              private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.popover.dismiss();
  }

  onSegmentChanged(event:any){

  }

  newChat(){
    this.open_new_chat = true;
  }

  onWillDismiss(event: any){

  }

  cancelar(){
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  startChat(item){

  }
  
  getChat(item){
    this.router.navigate(['/','mensajeria','chats', item?.id]);
  }
}
