import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { SessionEntry } from "../shared/sessions/sessions-entry";

const WEB_SERVER_DOMAIN = "http://10.0.2.2:3000/api/sessions";

export class SessionViewModel extends Observable {
    constructor() {
        super();

        // this.sessionsList = new ObservableArray<SessionEntry>();
        // const that = this;
        // http.getJSON(WEB_SERVER_DOMAIN + "/getAll").then((res: any) => {
        //     console.log(res);
        //     const jsonRes = JSON.parse(res.sessions)
        //     if (jsonRes.length > 0) {
        //         jsonRes.forEach((element: any) => {
        //             that.sessionsList.push(new SessionEntry(element.name, new Date(element.time), element.length, element.speakers));
        //         });
        //     }
        // }, (err) => {
        //     alert("Couldn't access web server: " + JSON.stringify(err));
        // }).catch((rej) => { console.log("Rejected: " + rej) });
    }
}
