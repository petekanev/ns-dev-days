import { Observable } from "data/observable";
import { Label } from "ui/label";

export class HomeViewModel extends Observable {
    public countdown: string = "N/A";
    private countDownComponent: android.os.CountDownTimer;
    constructor() {
        super();
        const toDate = new Date("2017-09-18T08:30:00-04:00");
        const currentDate = new Date();
        const difference = Math.abs(toDate.getTime() - currentDate.getTime());

        const updateCountDown = (countdown) => {
            this.set("countdown", countdown);
        }

        if (global.android) {
            ensureCountDownTimer();
            this.countDownComponent = new CountDownTimerClass(difference, 1000, updateCountDown).start();
        }
    }
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
