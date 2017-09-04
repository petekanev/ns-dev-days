import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { Constants } from "../shared/constants";

import { SpeakerEntry } from "../shared/speakers/speaker-entry";

export class SpeakerDetailsViewModel extends Observable {
    public speakerId: number;
    public speakerName: string;
    public speakerEntry: SpeakerEntry;

    constructor(speakerId, speakerName) {
        super();

        this.speakerId = speakerId;
        this.speakerName = speakerName;
        this.speakerEntry = new SpeakerEntry();

        const that = this;
        http.getJSON(Constants.WEB_SERVER_DOMAIN + "speakers/get?speakerId=" + speakerId).then((res: any) => {
            const jsonRes = JSON.parse(res.speaker);

            debugger;

            that.set("speakerEntry", new SpeakerEntry(jsonRes.speakerInfo.id, jsonRes.speakerInfo.name, jsonRes.sessions.length, jsonRes.speakerInfo.bio,jsonRes.sessions));
        }, (err) => {
            alert("Couldn't access web server: " + JSON.stringify(err));
        }).catch((rej) => { console.log("Rejected: " + rej) });
    }
}

class ShortSessionEntry {
    id: number;
    name: string;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}