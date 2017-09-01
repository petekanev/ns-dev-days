const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export class SessionEntry {
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
