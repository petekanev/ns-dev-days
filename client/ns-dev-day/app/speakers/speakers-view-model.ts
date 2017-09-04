import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { Constants } from "../shared/constants";

import { SpeakerEntry } from "../shared/speakers/speaker-entry";

export class SpeakersViewModel extends Observable {
    static Speakers: ObservableArray<SpeakerEntry> = new ObservableArray();

    constructor() {
        super();

        if (SpeakersViewModel.Speakers.length < 1) {
            http.getJSON(Constants.WEB_SERVER_DOMAIN + "speakers/getAll").then((res: any) => {
                const jsonRes = JSON.parse(res.speakers)
                if (jsonRes.length > 0) {
                    jsonRes.forEach((element: any) => {
                        debugger;
                        SpeakersViewModel.Speakers.push(new SpeakerEntry(element.speakerId, element.speakerName, element.speakerSessionsCount));
                    });
                }
            }, (err) => {
                alert("Couldn't access web server: " + JSON.stringify(err));
            }).catch((rej) => { console.log("Rejected: " + rej) });
        }
    }

    get speakers() {
        return SpeakersViewModel.Speakers;
    }
}
