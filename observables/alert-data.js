import { makeAutoObservable } from "mobx";
import { gsap } from "gsap";

export class AlertData{
    constructor() {
        makeAutoObservable(this);
    }

    isAlertShow = false;
    alertOpacity = 0;
    alertMessage = "";

    showAlertAnimated(message, timeS = 2) {
        if (this.isAlertShow) {
            return;
        }
        
        this.alertOpacity = 0;
        this.alertMessage = message;
        this.isAlertShow = true;

        const alertTimeLine = gsap.timeline({ defaults: { duration: 0.5 } });
        
        alertTimeLine.to(this, {
            alertOpacity: 1
        }).to(this, {
            alertOpacity: 0,
            onComplete: () => {
                this.isAlertShow = false;
            }
        }, `+=${timeS}`);
    }
}