import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  async back(){
    await this.router.navigateByUrl('menu');
  }

  async aceptar(){
    await this.router.navigateByUrl('menu');
  }

  
}
