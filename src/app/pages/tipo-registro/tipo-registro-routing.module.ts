import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoRegistroPage } from './tipo-registro.page';

const routes: Routes = [
  {
    path: '',
    component: TipoRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoRegistroPageRoutingModule {}
