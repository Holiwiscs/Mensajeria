import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrendatarioPageRoutingModule } from './arrendatario-routing.module';

import { ArrendatarioPage } from './arrendatario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrendatarioPageRoutingModule
  ],
  declarations: [ArrendatarioPage]
})
export class ArrendatarioPageModule {}
