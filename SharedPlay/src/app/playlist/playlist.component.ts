import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from "models/playlist";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    @Input() vid: any;

    // ytVid: any;

  constructor() {
    // this.ytVid = this.vid;
    // console.log(`YTVID IS!!!!!!!: ${this.ytVid}`);
   }

  ngOnInit() {
  }

}
