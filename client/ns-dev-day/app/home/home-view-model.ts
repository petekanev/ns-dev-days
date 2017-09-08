import { Observable } from "data/observable";
import { Label } from "ui/label";

export class HomeViewModel extends Observable {
    public countdown: string = "N/A";
    public announcement: string = "SEPTEMBER 23-24, 2018 / IT'S A FAKE\n" +
    "NATIVESCRIPT DEVELOPER DAY 2018\n" +
    "JAVASCRIPT. MOBILE. NATIVE.";
    public countdownClass: string = "no-countdown";

    private countDownComponent: android.os.CountDownTimer;
    constructor() {
        super();
        const toDate = new Date("2018-09-23T08:30:00-04:00");
        const endDate = new Date("2018-09-24T17:00:00-04:00");
        const currentDate = new Date();
        const difference = toDate.getTime() - currentDate.getTime();

        const updateCountDown = (countdown) => {
            this.countdown = millisecondsToReadableTime(countdown);
        }

        if (global.android) {
            class CountDownTimer extends android.os.CountDownTimer {
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

            this.countDownComponent = new CountDownTimer(difference, 1000, updateCountDown).start();
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
