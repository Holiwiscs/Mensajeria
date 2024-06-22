import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoRegistroPageRoutingModule } from './tipo-registro-routing.module';

import { TipoRegistroPage } from './tipo-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoRegistroPageRoutingModule
  ],
  declarations: [TipoRegistroPage]
})
export class TipoRegistroPageModule {}
