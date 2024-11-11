import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  userEmailVerified: boolean = false; // Inicializamos como falso

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificamos si el usuario está autenticado y si su correo está verificado
    this.afAuth.currentUser.then((user) => {
      if (user) {
        this.userEmailVerified = user.emailVerified;
      }
    });
  }

  // Método para reenviar el correo de verificación
  resendVerificationEmail() {
    this.afAuth.currentUser.then((user) => {
      if (user) {
        user.sendEmailVerification()
          .then(() => {
            console.log('Correo de verificación reenviado');
          })
          .catch((error) => {
            console.error('Error al reenviar correo de verificación:', error);
          });
      }
    });
  }
}