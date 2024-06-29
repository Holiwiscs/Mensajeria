import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RommiePage } from './rommie.page';

const routes: Routes = [
  {
    path: '',
    component: RommiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RommiePageRoutingModule {}
