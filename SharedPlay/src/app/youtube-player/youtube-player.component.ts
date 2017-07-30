import { Component, OnInit, Input } from '@angular/core';
import { PlaylistService } from "app/services/playlist.service";
import { Video } from "models/video";

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  @Input() video: Video;

  constructor(public playlistService: PlaylistService) {

  }
  ngOnInit() {
    console.log(this.video);
  }

}
