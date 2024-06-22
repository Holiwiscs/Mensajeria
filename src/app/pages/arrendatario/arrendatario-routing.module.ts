import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrendatarioPage } from './arrendatario.page';

const routes: Routes = [
  {
    path: '',
    component: ArrendatarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrendatarioPageRoutingModule {}
