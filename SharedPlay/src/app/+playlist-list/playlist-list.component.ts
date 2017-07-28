import { Component, OnInit } from '@angular/core';
import { PlaylistService } from "app/services/playlist.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

  songName: string;
  video: any;
  playlistName: string;

  constructor(public playlistService: PlaylistService, private route: ActivatedRoute) {
    this.route.params.subscribe((routeParams: Params) => {
      this.playlistName = routeParams['active'];
    });
   }

  ngOnInit() {
  }

  addSongToPlaylist() {

    this.video = this.playlistService.addSongToPlaylist(this.playlistName, this.songName);
    // while (typeof (this.video) === 'undefined') {
    //   console.log(this.video);
    // }
    
    this.songName = '';
  }

}
