import { Injectable } from '@angular/core';
import { Playlist } from "models/playlist";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  readonly playlistsPath = 'playlists';

  constructor(private db: AngularFireDatabase, public authService: AuthService) { }

  joinOrCreate(playlist: Playlist) {
    if (this.checkIfPlaylistExists(playlist)) {
      this.joinPlaylist(playlist);
    } else {
       return this.createPlaylist(playlist);
    }
  }

  checkIfPlaylistExists(playlist: Playlist): boolean {
    return false;
  }

  createPlaylist(playlist: Playlist) {
    firebase.database().ref().child(this.playlistsPath).push(playlist);
    return playlist.playlistName;
  }

  joinPlaylist(playlist) {

  }

}
