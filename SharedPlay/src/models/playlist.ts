

import { FirebaseFlatSnapshot } from "models/firebase-flat-snapshot";

export class Playlist extends FirebaseFlatSnapshot {

    public owner: string;
    public playlistName: string;

    constructor(obj?: any) {
        super(obj);
        this.owner = obj && obj.owner || '';
        this.playlistName = obj && obj.playlistName || '';
    }

}