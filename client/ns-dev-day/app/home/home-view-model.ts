import { Observable } from "data/observable";
import { Label } from "ui/label";

export class HomeViewModel extends Observable {
    public countdown: string = "N/A";
    public announcement: string =  "SEPTEMBER 18-19, 2017 / NEW YORK CITY\n" +
                "NATIVESCRIPT DEVELOPER DAY 2017\n" +
                "JAVASCRIPT. MOBILE. NATIVE.";
    public countdownClass: string = "no-countdown";

    private countDownComponent: android.os.CountDownTimer;
    constructor() {
        super();
        const toDate = new Date("2017-09-18T08:30:00-04:00");
        const endDate = new Date("2017-09-19T17:00:00-04:00");
        const currentDate = new Date();
        const difference = toDate.getTime() - currentDate.getTime();
        const isOver = (currentDate.getTime() - endDate.getTime()) > 0;

        if (isOver) {
            this.set("countdown", "DeveloperDay is over :-(");
            this.set("announcement", "We'll see you again next year!");

            return;
        }

        if (difference < 0) {
            this.set("countdown", "DeveloperDay is here!");
            
            return;
        }

        this.set("countdownClass", "countdown-widget");

        const updateCountDown = (countdown) => {
            this.set("countdown", millisecondsToReadableTime(countdown));
        }

        if (global.android) {
            ensureCountDownTimer();
            this.countDownComponent = new CountDownTimerClass(difference, 1000, updateCountDown).start();
        }
    }
}

function millisecondsToReadableTime(milliseconds: number) {
    let seconds: number | string = Math.floor((milliseconds / 1000) % 60);
    seconds = seconds > 9 ? seconds : "0" + seconds;
    let minutes: number | string = Math.floor((milliseconds / (1000 * 60)) % 60);
    minutes = minutes > 9 ? minutes : "0" + minutes;
    const hours = (milliseconds / (1000 * 60 * 60));
    let readableHours: number | string = Math.floor(hours % 24);
    readableHours = readableHours > 9 ? readableHours : "0" + readableHours;
    let days: number | string = Math.floor(hours / 24);
    days = days > 1 ? `${days} days` : "1 day";
    
    return `${days}, ${readableHours}:${minutes}:${seconds}`;
}

let CountDownTimerClass;
function ensureCountDownTimer() {
    if (!CountDownTimerClass) {
        CountDownTimerClass = class CountDownTimer extends android.os.CountDownTimer {
            private updateCountDownCB;

            constructor(millisInFuture: number, interval: number, updateCountDownCB) {
                super(millisInFuture, interval);

                this.updateCountDownCB = updateCountDownCB;

                return global.__native(this);
            }

            public onTick(millisUntilFinished) {
                this.updateCountDownCB(millisUntilFinished);
            }

            public onFinish() {
                this.updateCountDownCB("NativeScript Dev Days is here!");
            }
        }
    }
}
