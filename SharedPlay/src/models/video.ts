

import { FirebaseFlatSnapshot } from "models/firebase-flat-snapshot";

export class Video extends FirebaseFlatSnapshot {

    public videoUrl: string;
    public playlistName: string;
    public videoId: string;
    title: string;

    constructor(obj?: any) {
        super(obj);
        this.videoUrl = obj && obj.videoUrl || '';
        this.playlistName = obj && obj.playlistName || '';
        this.videoId = obj && obj.videoId || '';
        this.title = obj && obj.title || '';
    }

}