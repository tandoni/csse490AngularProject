import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { UserService } from "app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  clicked(playlistName: string) {
    console.log('blahhhhhh');

    this.router.navigate(['activeplaylist', playlistName])
  }

}
