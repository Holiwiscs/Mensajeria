import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController
              
  ) { }

  async mostrarAlerta(msg:string,title:string){
    var alerta = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']})
    await alerta.present();
    return alerta;
  }

  async MostrarCarga(msg:string){
    var cargando = await this.loadingController.create(
      {
        cssClass:"loaderClass",
        message:msg,
        translucent:true
      }
      );
      await cargando.present();
      return cargando;
    }

    async Confirmar(msg:string,btn_si:string,btn_no:string){
      let promesa = new Promise<boolean>(async (resolve) =>{
        var alerta = await this.alertService.create({cssClass:"", message:msg,buttons:
        [
          {
            text:btn_si,
            handler:() =>{
              resolve(true);
            }
          },
          {
            text:btn_no,
            handler:() =>{
              resolve(false);
            }
         }
      ]
      });
      await alerta.present();
    })
    return promesa;
  }

  async showtoast(msg:string, duracion:number = 2000){
    var toast = await this.toastController.create(
      {
        cssClass:"toastClass",
        message:msg,
        duration:duracion,
        position:"bottom",
        color:"dark"
      });
      await toast.present();
      return toast;
  }

}

