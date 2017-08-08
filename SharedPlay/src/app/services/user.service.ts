import { Injectable, Query } from '@angular/core';
import { Playlist } from "models/playlist";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  readonly playlistsPath = '/playlists';
  playlistsStream: FirebaseListObservable<Playlist[]>;
  // public isPlaylistInLast5Hours: Subject<Playlist>;

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    // this.isPlaylistInLast5Hours = new BehaviorSubject<Playlist>(new Playlist());


    // TODO: FUTURE:: get playlists created in the last 5 hours.
    // const queryStream: Observable<Query> = Observable.combineLatest<Query>(
    //   this.isPlaylistInLast5Hours,
    //   (playlist: Playlist) => {
    //       return {
    //         orderByChild: 'timestamp',
    //         startAt: playlist.timestamp,
    //       };
    //   });

    // const allStream: Observable<Playlist[]> = queryStream.
    //   switchMap<Query, Playlist[]>((queryParam: Query) => {
    //     return this.db.list(this.playlistsPath, {
    //       query: queryParam,
    //     });
    //   }); 



    this.playlistsStream = this.db.list(this.playlistsPath);
  }

  joinOrCreate(playlist: Playlist) {
    if (this.checkIfPlaylistExists(playlist)) {

    } else {
      this.createPlaylist(playlist);
    }

    this.addCurrentPlaylist(playlist.playlistName);
  }

  addCurrentPlaylist(name: string) {
    firebase.database().ref(`/currentPlaylist`).set(name);
  }

  getCurrentPlaylist(): Promise<any> {
    return new Promise((resolve, reject) => {
      let all = firebase.database().ref('/currentPlaylist');
      all.once('value', (snapshot) => {
        resolve({ res: snapshot.val() });
      }).catch(err => {
        reject({ res: '' });
      });
    });
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
    playlist.playlistName = playlist.playlistName.toLowerCase();
    firebase.database().ref(`${this.playlistsPath}/${playlist.playlistName}`).set(playlist);

    // this.db.object(`${this.playlistsPath}/${x.key}`).set(playlist);
    return playlist.playlistName;
  }

}
