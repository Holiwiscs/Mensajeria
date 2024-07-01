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
  users: Array<any>=[
    {
      name:'juanitoculisuelto',
      age:23,
      img:'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg',
      descripcion: 'Me gustan los gatos'
    },
    {
      name:'elsapallo',
      age:20,
      img:'https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg',
      descripcion: 'Me gustan los perritos'    },
    {
     name:'marioneta',
     age:18,
     img:'https://media.gq.com.mx/photos/61780a08f865d472dfcd66c8/master/w_2560%2Cc_limit/GettyImages-1225777369.jpg',
     descripcion: 'Me gustan los perritos'
    }
  ]

  

  startX:number=0;
  endX:number=0;
  private subscriptions: Subscription[] = [];

  uid: string = null;
  userInfo: usuarioPf;
  

  constructor(private gestureCtrl: GestureController,
              private helper:HelperService,
              private auth: AngularFireAuth,
              private router: Router,
              public dataBase: DatabaseService,
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
  touchStart(evt:any){
    this.startX=evt.touches[0].pageX;
  }
  
  touchMove(evt:any, index:number){
    let deltaX= this.startX - evt.touches[0].pageX;
    let deg = deltaX/10;
    this.endX=evt.touches[0].pageX;
    //swipe gesture
    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform="translateX("+ -deltaX + "px) rotate(" + -deg +"deg)";
  
   if((this.endX - this.startX) < 0){
    (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity=String(deltaX / 100);
  }
  else{
    (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity=String(-deltaX / 100);
  
  }
   
  }
  touchEnd(index:number){
    if(this.endX > 0){
      let finalX=this.endX= this.startX;
      if(finalX > -100 && finalX < 100 ){
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition=".3s";
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform= "translate(0px) rotate(0deg)";
       setTimeout(()=>{
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition="0s";
        },350);
      
       
      }
      else if(finalX <= -100){
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition="1s";
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform="translateX(-1000px) rotate(-30deg)";
      
        setTimeout(() => {
          this.users.splice(index,1);
        }, 100);
        
      }
      else if (finalX >= 100){
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition="1s";
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform="translateX(-1000px) rotate(-30deg)";
      
        setTimeout(() => {
          this.users.splice(index,1);
        }, 100);
      }
      this.startX=0;
      this.endX=0;
      (<HTMLStyleElement>document.getElementById("reject-icon")).style.opacity="0";
      (<HTMLStyleElement>document.getElementById("accept-icon")).style.opacity="0";
  
  
    }
  }
 
 

  async getUid(){
    const uidd = await this.dataBase.getUid();
    if(uidd){
      this.uid = uidd;
      console.log(' Mi uid ->', this.uid);
      this.getInfoUser();
      this.getInfoDescripcion();
    } else {
      console.log('no existe uid');
    }
  }

  getInfoDescripcion(){
    const path = 'Descripcion'
    const id = this.uid;
    this.dataBase.getDoc<descripcionU>(path, id).subscribe(res =>{
      console.log("Las descripciones son estas -> ", res)
    })
  }


  getInfoUser(){
    const path = 'Usuario';
    const id = this.uid;
    this.dataBase.getDoc<usuarioPf>(path, id).subscribe(res => {
      if(res){
        this.userInfo = res;
        console.log("Los datos son -> ", this.userInfo);
      } else{
        console.log("No se encontraron datos para el usuario con UID ", id);
      }
    });
    // // this.dataBase.getDoc(path, uid).subscribe( res => {
    // //   console.log("Los datos son -> ", res);
    // })    
    }
    

  
  

  async cerrarSesion(){
    var salir = await this.helper.Confirmar("¿Desea cerrar sesión?","Salir","Cancelar");
    if(salir == true){
      await this.auth.signOut();
      await this.router.navigateByUrl("login");
    }
  
  }
  async perfil(){
    await this.router.navigateByUrl('perfil');
  }

  async mensajeria(){
    await this.router.navigateByUrl('mensajeria');
  }





}
