import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrendadorPage } from './arrendador.page';

const routes: Routes = [
  {
    path: '',
    component: ArrendadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrendadorPageRoutingModule {}
