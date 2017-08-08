import { Component } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { UserService } from "app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentPlaylist: string;

  constructor(private router: Router, public authService: AuthService, public userService: UserService) {
  }

  goToActive() {
    this.userService.getCurrentPlaylist().then(res => {
      console.log(res);
      // this.currentPlaylist = res.res;
      this.router.navigate(['activeplaylist', res.res]);
    });;
  }
}
