import { Injectable } from '@angular/core';
import { Playlist } from "models/playlist";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  readonly playlistsPath = 'playlists';
  playlistsStream: FirebaseListObservable<Playlist[]>

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    this.playlistsStream = this.db.list(this.playlistsPath);
   }

  joinOrCreate(playlist: Playlist) {
    if (this.checkIfPlaylistExists(playlist)) {

    } else {
      this.createPlaylist(playlist);
    }
  }

  checkIfPlaylistExists(playlist: Playlist): boolean {
    let all = firebase.database().ref(this.playlistsPath);
    all.once('value', (snapshot) => { 
      let data = Object.keys(snapshot.val());
      return data.indexOf(playlist.playlistName) !== -1
     });
    return false;
  }

  createPlaylist(playlist: Playlist) {
    firebase.database().ref(`${this.playlistsPath}/${playlist.playlistName}`).set(playlist);

    // this.db.object(`${this.playlistsPath}/${x.key}`).set(playlist);
    return playlist.playlistName;
  }

}
