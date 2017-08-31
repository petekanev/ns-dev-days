import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";

const WEB_SERVER_DOMAIN = "http://10.0.2.2:3000/api/sessions"

export class SessionsViewModel extends Observable {
    public sessionsList: ObservableArray<any>;

    constructor() {
        super();

        http.getJSON(WEB_SERVER_DOMAIN + "/getAll").then((res: any) => {
            console.log(res);
            const jsonRes = JSON.parse(res.sessions)
            if (jsonRes.length > 0) {
                jsonRes.forEach((element : any) => {
                    this.sessionsList.push(new SessionEntry(element.name, element.time.toLocaleString(), element.length, element.speakers));
                });
            }
        }, (err) => {
            alert("Couldn't access web server: " + JSON.stringify(err));
        });
    }
}

class SessionEntry {
    public timeString: string;
    public name: string;
    public speakers: string[];
    public duration: number;

    constructor(name, time, duration, speakers) {
        this.name = name;
        this.timeString = time;
        this.duration = duration;
        this.speakers = speakers;
    }
}
