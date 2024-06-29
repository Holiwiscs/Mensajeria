import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RommiePageRoutingModule } from './rommie-routing.module';

import { RommiePage } from './rommie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RommiePageRoutingModule
  ],
  declarations: [RommiePage]
})
export class RommiePageModule {}
