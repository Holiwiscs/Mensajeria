import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrendadorPageRoutingModule } from './arrendador-routing.module';

import { ArrendadorPage } from './arrendador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrendadorPageRoutingModule
  ],
  declarations: [ArrendadorPage]
})
export class ArrendadorPageModule {}
