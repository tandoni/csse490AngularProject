import { Component, OnInit, Input, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { Playlist } from "models/playlist";
import { PlaylistService } from "app/services/playlist.service";
import { Video } from "models/video";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  parent: HTMLElement;
  playlistName: string;

  private player;
  private ytEvent;

  constructor(public playlistService: PlaylistService) {
    this.playlistName = playlistService.playlistName;
    this.playlistService.showOnlyMyVids(this.playlistName);
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  ngOnInit() {
    this.parent = document.getElementById('vids');
    this.playlistService.videoStream.forEach((item) => {
      for (let i of item.reverse()) {
        let div = document.createElement('div');

        if (!document.querySelector(`span.${i.$key}`)) {
          let span = document.createElement('span');
          span.innerHTML = i.title;
          span.className = i.$key;
          this.parent.appendChild(span);
        }

        div.id = i.$key;

        this.playlistName = i.playlistName;

        this.parent.appendChild(div);

        let player = new YT.Player(div.id, {
          height: 100,
          width: 100,
          videoId: i.videoId,
          events: {
            onReady: (event) => {
              this.savePlayer(event.target);
            },
            onError: (e) => {
              console.log('error', e);
            },
            onStateChange: (event) => {
              this.onStateChange(event);
            }
          }
        });
      }
    });
  }

}
