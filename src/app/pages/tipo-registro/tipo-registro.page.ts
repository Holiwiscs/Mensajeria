import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-registro',
  templateUrl: './tipo-registro.page.html',
  styleUrls: ['./tipo-registro.page.scss'],
})
export class TipoRegistroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  async habitacion(){
    await this.router.navigateByUrl("arrendatario");
  }

  async rommie(){
    await this.router.navigateByUrl("arrendador");
  }

  async back(){
    await this.router.navigateByUrl("registro");
  }

}
