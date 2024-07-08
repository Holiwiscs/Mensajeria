import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajeriaPage } from './mensajeria.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeriaPage
  },
  {
    path: 'chat/:id',  // Ruta para acceder a chats específicos
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajeriaPageRoutingModule {}
