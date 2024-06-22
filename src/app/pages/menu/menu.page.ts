import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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

  constructor(private helper:HelperService,
              private auth: AngularFireAuth,
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
    this.router.navigate(['/','menu','chats', item?.id]);
  }

  async cerrarSesion(){
    var salir = await this.helper.Confirmar("¿Desea cerrar sesión?","Salir","Cancelar");
    if(salir == true){
      await this.auth.signOut();
      //await this.router.navigateByUrl("login");
    }
  
  }

}
