import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'propietario',
    loadChildren: () => import('./pages/propietario/propietario.module').then( m => m.PropietarioPageModule),canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'roommie',
    loadChildren: () => import('./pages/rommie/rommie.module').then( m => m.RommiePageModule),canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module').then( m => m.SoportePageModule),canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'terminos',
    loadChildren: () => import('./pages/terminos/terminos.module').then( m => m.TerminosPageModule),canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'chat/:chatId',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'mensajeria',
    loadChildren: () => import('./pages/mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule),canActivate:[AngularFireAuthGuard]
  },
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
