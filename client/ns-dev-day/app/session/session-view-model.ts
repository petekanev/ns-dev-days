import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { SessionEntry } from "../shared/sessions/sessions-entry";
import { Constants } from "../shared/constants";

export class SessionViewModel extends Observable {
    public sessionId: number;
    public sessionName: string;
    public sessionEntry: SessionEntry;
    public isLoading: boolean;

    constructor(sessionId, sessionName) {
        super();
        this.sessionEntry = new SessionEntry();
        this.sessionId = sessionId;
        this.sessionName = sessionName;
        this.isLoading = true;

        const that = this;
        debugger;
        http.getJSON(Constants.WEB_SERVER_DOMAIN + "sessions/get?sessionId=" + sessionId)
            .then((res: any) => {
                const jsonRes = JSON.parse(res.session);

                that.set("sessionEntry", new SessionEntry(jsonRes.id, jsonRes.name, new Date(jsonRes.time), jsonRes.length, jsonRes.speakers, jsonRes.description));
                that.set("isLoading", false);
            }, (err) => {
                alert("Couldn't access web server: " + JSON.stringify(err));
            }).catch((rej) => { console.log("Rejected: " + rej) });
    }
}
