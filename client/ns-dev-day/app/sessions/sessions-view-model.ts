import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { SessionEntry } from "../shared/sessions/sessions-entry";
import { Constants } from "../shared/constants";

const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export class SessionsViewModel extends Observable {
    public sessionsList: ObservableArray<any>;
    public isLoading: boolean;

    constructor() {
        super();

        this.isLoading = true;

        this.sessionsList = new ObservableArray<SessionEntry>();
        const that = this;
        http.getJSON(Constants.WEB_SERVER_DOMAIN + "sessions/getAll").then((res: any) => {
            const jsonRes = JSON.parse(res.sessions)
            if (jsonRes.length > 0) {
                jsonRes.forEach((element: any) => {
                    that.sessionsList.push(new SessionEntry(element.id, element.name, new Date(element.time), element.length, element.speakers));
                    that.set("isLoading", false);
                });
            }
        }, (err) => {
            alert("Couldn't access web server: " + JSON.stringify(err));
        }).catch((rej) => { console.log("Rejected: " + rej) });
    }
}
