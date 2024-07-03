import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-tipo-registro',
  templateUrl: './tipo-registro.page.html',
  styleUrls: ['./tipo-registro.page.scss'],
})
export class TipoRegistroPage implements OnInit {

  seleHabitacion:any;
  seleRommie:any;

  constructor(private router: Router
  ) { }

  ngOnInit() {
  }


  
  async habitacion(){
    await this.router.navigateByUrl("rommie");
  }

  async propietario(){
    await this.router.navigateByUrl("propietario");
  }

  async back(){
    await this.router.navigateByUrl("registro");
  }

}
