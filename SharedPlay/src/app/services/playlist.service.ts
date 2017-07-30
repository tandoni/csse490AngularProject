import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "app/services/auth.service";
import * as firebase from 'firebase';
import { Playlist } from "models/playlist";
import 'rxjs/add/operator/switchMap';
import * as YouTubeSearch from "youtube-search";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/Observable/combineLatest';
import { Video } from "models/video";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Query } from "angularfire2/interfaces";

@Injectable()
export class PlaylistService {

  readonly videosPath = 'videos'

  public playlistName: string;
  videoStream: Observable<Video[]>
  public isMypostsPageStream: Subject<string>;

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    this.isMypostsPageStream = new BehaviorSubject<string>('');

    const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      this.isMypostsPageStream,
      (myPlaylist: boolean) => {
        if (myPlaylist) {
          return {
            orderByChild: 'playlistName',
            equalTo: this.playlistName,
          };
        };
      });

    const allStream: Observable<Video[]> = queryStream.
      switchMap<Query, Video[]>((queryParam: Query) => {
        return this.db.list(this.videosPath, {
          query: queryParam,
        });
      });


    this.videoStream = Observable.combineLatest<Video[]>(
      allStream,
      (videos: Video[]) => {
        return videos;
      });
  }

  showOnlyMyVids(playlistName: string) {
    this.isMypostsPageStream.next(playlistName);
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
      this.add(new Video({ title: results[0].title, playlistName: playlistName, videoUrl: results[0].link, videoId: results[0].id }))
      console.log(res);
    });
    return res;
  }

  add(vid: Video) {
    firebase.database().ref().child(this.videosPath).push(vid);
  }
}
