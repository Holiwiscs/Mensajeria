import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string = "";
  contrasena: string = "";

  constructor(private router: Router,
              private helper: HelperService,
              private auth: AngularFireAuth,
              private loadercontroller: LoadingController
  ) { }

  ngOnInit() { }

  async Login() {
    const cargando = await this.helper.MostrarCarga("Cargando...");

    if (this.usuario === "") {
      await cargando.dismiss();
      await this.helper.mostrarAlerta("Debes ingresar un correo", "Información");
      return;
    }

    if (this.contrasena === "") {
      await cargando.dismiss();
      await this.helper.mostrarAlerta("Debes ingresar una contraseña", "Información");
      return;
    }

    try {
      const req = await this.auth.signInWithEmailAndPassword(this.usuario, this.contrasena);

      // Verificar si el correo electrónico está verificado
      if (req.user && !req.user.emailVerified) {
        await this.auth.signOut();
        await this.helper.mostrarAlerta("Debes verificar tu correo electrónico antes de iniciar sesión.", "Verificación requerida");
      } else {
        await this.router.navigateByUrl('menu');
      }
      await cargando.dismiss();
    } catch (error: any) {
      await cargando.dismiss();
      
      if (error.code === 'auth/invalid-email') {
        await this.helper.mostrarAlerta("El correo no es válido", "Error");
      } else if (error.code === 'auth/wrong-password') {
        await this.helper.mostrarAlerta("La contraseña ingresada no es válida", "Error");
      } else {
        await this.helper.mostrarAlerta("Error desconocido al iniciar sesión", "Error");
      }
    }
  }

  async registrateAqui() {
    await this.router.navigateByUrl('registro');
  }

  async restContrasena() {
    await this.router.navigateByUrl('restablecer');
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HelperService } from 'src/app/services/helper.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { LoadingController } from '@ionic/angular';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   usuario: string = "";
//   contrasena: string = "";

//   constructor(
//     private router: Router,
//     private helper: HelperService,
//     private auth: AngularFireAuth,
//     private loadercontroller: LoadingController
//   ) { }

//   ngOnInit() { }

//   async Login() {
//     const cargando = await this.helper.MostrarCarga("Cargando...");

//     if (this.usuario === "") {
//       await cargando.dismiss();
//       await this.helper.mostrarAlerta("Debes ingresar un correo", "Información");
//       return;
//     }

//     if (this.contrasena === "") {
//       await cargando.dismiss();
//       await this.helper.mostrarAlerta("Debes ingresar una contraseña", "Información");
//       return;
//     }

//     try {
//       const req = await this.auth.signInWithEmailAndPassword(this.usuario, this.contrasena);
//       await this.router.navigateByUrl('menu');
//     } catch (error: any) {
//       await cargando.dismiss();
      
//       if (error.code === 'auth/invalid-email') {
//         await this.helper.mostrarAlerta("El correo no es válido", "Error");
//       } else if (error.code === 'auth/wrong-password') {
//         await this.helper.mostrarAlerta("La contraseña ingresada no es válida", "Error");
//       } else {
//         await this.helper.mostrarAlerta("Error desconocido al iniciar sesión", "Error");
//       }
//     } finally {
//       await cargando.dismiss();
//     }
//   }

//   async registrateAqui() {
//     await this.router.navigateByUrl('registro');
//   }

//   async restContrasena() {
//     await this.router.navigateByUrl('restablecer');
//   }
// }
