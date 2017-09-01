const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export class SessionEntry {
    public id: number;
    public timeString: string;
    public dayString: string;
    public name: string;
    public speakers: string[];
    public duration: string;
    public description?: string;
    public endTimeString?: string;
    public dayOfTheWeek?: string;
    public composedSessionTimeString?: string;
    public composedSessionDateString?: string;

    constructor(id?: number, name?, time?: Date, duration?, speakers?, description?: string) {
        this.id = id || -1;
        this.name = name || "";
        this.timeString = time ? time.getHours() + ":" + (time.getMinutes() === 0 ? "00" : time.getMinutes()) : "";
        this.dayString = time ? monthsArr[time.getUTCMonth()] + " " + time.getUTCDate() : "";
        this.duration = duration + " mins";
        this.speakers = speakers || [];
        this.description = description || "";

        if (time) {
            let endDate = new Date(time.setMinutes(time.getMinutes() + duration || 0));

            this.endTimeString = time ? endDate.getHours() + ":" + (endDate.getMinutes() === 0 ? "00" : endDate.getMinutes()) : "";
            this.dayOfTheWeek = daysArr[time.getDay()];
        }

        if (this.timeString && this.endTimeString) {
            this.composedSessionTimeString = this.timeString + " - " + this.endTimeString;   
        }

        if (this.dayOfTheWeek) {
            this.composedSessionDateString = this.dayOfTheWeek + ", " + this.dayString;
        }
    }
}
