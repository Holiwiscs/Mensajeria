import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioPf } from 'src/app/models/usuario';
import { FotografiaService } from 'src/app/services/fotografia.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  fotos : string []=[];
  usuario:usuarioPf[]=[];

  constructor(private router:Router,
              private fotografiaService:FotografiaService
  ) { 
    this.fotos = this.fotografiaService.fotos;
  }

  ngOnInit() {
  }

  async tomarFoto(){
    await this.fotografiaService.addNuevaFoto();
  }

  async back(){
    await this.router.navigateByUrl("menu");
  }

}
