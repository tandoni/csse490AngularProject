import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';
import { Playlist } from "models/playlist";
import * as YouTubeSearch from "youtube-search";
import { Observable } from "rxjs/Observable";
import { Video } from "models/video";

@Injectable()
export class PlaylistService {

  readonly videosPath = 'videos'

  public videoStream: Observable<any>;

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    // this.videoStream = this.afAuth.authState
    //   .map<firebase.User, string>((user: firebase.User) => {
    //     console.log(user.photoURL);
    //     return user ? user.photoURL : '';
    //   })
   }


  addSongToPlaylist(playlistName: string, songName: string) {
    let res: any;
    let opts: YouTubeSearch.YouTubeSearchOptions = {
      maxResults: 1,
      key: 'AIzaSyB5iiuhSXWfbjEvebpcUBzUFwpXuqNDy9o'
    };

    YouTubeSearch(songName, opts, (err, results) => {
      if (err) return console.log(err);

      res = results;
      // this.add(new Video({ playlist: playlistName, videoUrl: results[0].link }))
      console.log(res);
    });
    return res;
  }

   add(vid: Video) {
    firebase.database().ref().child(this.videosPath).push(vid);
  }
}
