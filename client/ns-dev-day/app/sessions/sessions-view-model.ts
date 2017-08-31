import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";

const WEB_SERVER_DOMAIN = "http://10.0.2.2:3000/api/sessions"
const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export class SessionsViewModel extends Observable {
    public sessionsList: ObservableArray<any>;

    constructor() {
        super();

        this.sessionsList = new ObservableArray<SessionEntry>();
        const that = this;
        http.getJSON(WEB_SERVER_DOMAIN + "/getAll").then((res: any) => {
            console.log(res);
            const jsonRes = JSON.parse(res.sessions)
            if (jsonRes.length > 0) {
                jsonRes.forEach((element: any) => {
                    that.sessionsList.push(new SessionEntry(element.name, new Date(element.time), element.length, element.speakers));
                });
            }
        }, (err) => {
            alert("Couldn't access web server: " + JSON.stringify(err));
        }).catch((rej) => { console.log("Rejected: " + rej) });
    }
}

class SessionEntry {
    public timeString: string;
    public dayString: string;
    public name: string;
    public speakers: string[];
    public duration: string;

    constructor(name, time: Date, duration, speakers) {
        this.name = name;
        this.timeString = time.getHours() + ":" + (time.getMinutes() === 0 ? "00" : time.getMinutes());
        this.dayString = time.getUTCDate() + " " + monthsArr[time.getUTCMonth()];
        this.duration = duration + " mins";
        this.speakers = speakers;
    }
}
