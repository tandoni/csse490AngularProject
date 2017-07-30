import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "app/services/playlist.service";
import { UserService } from "app/services/user.service";
import * as firebase from 'firebase';
import { Playlist } from "models/playlist";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-joinplaylist',
  templateUrl: './joinplaylist.component.html',
  styleUrls: ['./joinplaylist.component.scss']
})
export class JoinplaylistComponent implements OnInit {

  playlistName: string;
  playlist: Playlist;
  
  constructor(public userService: UserService, public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  joinOrCreate() {
    this.playlist = new Playlist({ owner: this.authService._currentUsersUid, playlistName: this.playlistName});
    this.userService.joinOrCreate(this.playlist);
    this.router.navigate(['/activeplaylist', this.playlist.playlistName]);
  }

}
