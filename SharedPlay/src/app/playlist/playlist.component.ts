import { Component, OnInit, Input, AfterViewInit, Renderer, ElementRef, Directive, Output, EventEmitter } from '@angular/core';
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

  private players: YT.Player[];
  private ytEvent;

  constructor(public playlistService: PlaylistService) {
    this.playlistName = playlistService.playlistName;
    this.playlistService.showOnlyMyVids(this.playlistName);
    this.players = [];
  }

  // onStateChange(event) {
  //   this.ytEvent = event.data;
  // }
  // savePlayer(players) {
  //   this.players = players;
  // }

  // playVideo() {
  //   this.players[0].playVideo();
  // }

  // pauseVideo() {
  //   this.players[0].pauseVideo();
  // }

  ngOnInit() {
    this.parent = document.getElementById('vids');
    this.playlistService.videoStream.subscribe((item: Video[]) => {
      for (let i of item) {

        this.playlistName = i.playlistName;

        if (!document.querySelector(`iframe#${i.$key}`)) {
          let mainDiv = document.createElement('div');
          mainDiv.style.margin = '20px';

          let span = document.createElement('span');
          span.innerHTML = i.title;
          span.className = i.$key;

          let inDiv = document.createElement('div');
          inDiv.id = i.$key;

          mainDiv.appendChild(span);
          mainDiv.appendChild(inDiv);

          this.parent.appendChild(mainDiv);

          let player = new YT.Player(inDiv.id, {
            height: 1,
            width: 1,
            videoId: i.videoId,
            events: {
              // onReady: (event) => {
              //   this.savePlayer(event.target);
              // },
              onError: (e) => {
                console.log('error', e);
              },
              // onStateChange: (event) => {
              //   this.onStateChange(event);
              // }
            }
          });
          this.players.push(player);

          let playBtn = document.createElement('button');
          let pauseBtn = document.createElement('button');

          playBtn.textContent = "Play";
          playBtn.className="actions";
          pauseBtn.textContent = "Pause";
          pauseBtn.className = "actions";
          
          playBtn.addEventListener('click', (event) => {
            player.playVideo();
          });
          pauseBtn.addEventListener('click', (event) => {
            player.pauseVideo();
          });

          mainDiv.appendChild(playBtn);
          mainDiv.appendChild(pauseBtn);
        }
      }
    });
  }

}
