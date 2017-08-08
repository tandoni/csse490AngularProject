import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  phoneNumber: string;
  code: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  user: firebase.User;
  name: string;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      this.phoneNumber = "+1";
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha');
      this.recaptchaVerifier.render();
    });

    this.authService.displayNameStream.subscribe((res) => {
      this.name = res;
    });
    // if (!this.authService._currentUsersUid) {
    // }
  }

  signInWithPhoneNumber() {
    this.authService.signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier);

  }

  signInWithCode() {
    this.authService.signInWithCode(this.code);
  }

}
