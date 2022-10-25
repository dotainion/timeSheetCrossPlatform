import React, { useEffect, useRef } from "react";
import $ from 'jquery';


class Clock{
    days = 0;
    hr = 0;
    min = 0;
    sec = 0;
    reference = null;
    timeIntervalRef = null;
    timerIntervalRef = null;

    setTimeAt(days, hr, min, sec){
        this.days = days || 0;
        this.hr = hr || 0;
        this.min = min || 0;
        this.sec = sec || 0;
    }

    setReference(reference){
        this.reference = reference;
    }

    updateUi(value){
        $(this.reference).text(value);
    }

    reset(){
        this.days = 0;
        this.hr = 0;
        this.min = 0;
        this.sec = 0;
    }

    stopTimer() {
        clearInterval(this.timerIntervalRef);
        this.reset();
    }

    startTimer(callBack) {
        this.timerIntervalRef = setInterval(()=>{
            this.days = parseInt(this.days);
            this.sec = parseInt(this.sec);
            this.min = parseInt(this.min);
            this.hr = parseInt(this.hr);

            this.sec = this.sec + 1;

            if (this.sec == 60) {
                this.min = this.min + 1;
                this.sec = 0;
            }
            if (this.min == 60) {
                this.hr = this.hr + 1;
                this.min = 0;
                this.sec = 0;
            }
            if (this.hr == 24){
                this.days = this.days + 1;
                this.hr = 0;
                this.min = 0;
                this.sec = 0;
            }

            if (this.sec < 10 || this.sec == 0) this.sec = '0' + this.sec;
            if (this.min < 10 || this.min == 0) this.min = '0' + this.min;
            if (this.hr < 10 || this.hr == 0) this.hr = '0' + this.hr;

            let object = {
                element: this.reference,
                value: `${this.hr}:${this.min}:${this.sec}`,
            }

            if(this.days == 1) object.value = `${this.days} day, ${object.value}`;
            if(this.days > 1) object.value = `${this.days} days, ${object.value}`;

            this.updateUi(object.value);

            callBack?.(object);
        }, 1000);
    }

    pauseTimer(){
        clearInterval(this.timerIntervalRef);
        this.updateUi('Pause');
    }

    startTime(callBack){
        this.timeIntervalRef = setTimeout(()=>{
            const d = new Date();

            const object = {
                element: this.reference,
                value: d.toLocaleTimeString(),
            }

            this.updateUi(object.value);

            callBack?.(object);
        }, 1000);
    }

    stopTime(){
        clearInterval(this.timeIntervalRef);
        this.reset();
    }

    pauseTime(){
        clearInterval(this.timeIntervalRef);
        this.updateUi('Pause');
    }
}

const timer = new Clock();

export const StopClock = ({startTime, startTimer, startAt, displayOverride, style}) =>{
    const clockRef = useRef();

    useEffect(()=>timer.setReference(clockRef.current), []);

    useEffect(()=>{
        if (startTime?.toLowerCase?.() == 'pause'){
            timer.pauseTime();
        } else if (startTime){
            timer.startTime((t)=>{});
        } else{
            timer.stopTime();
        }
    }, [startTime]);

    useEffect(()=>{
        if (startTimer?.toLowerCase?.() == 'pause'){
            timer.pauseTimer();
        } else if (startTimer){
            timer.startTimer((t)=>{});
        } else{
            timer.stopTimer();
        }
    }, [startTimer]);

    useEffect(()=>{
        if (typeof startAt == 'string'){
            const [extra, min, sec] = startAt?.split(':');
            const [days, none, hr] = extra?.split(' ');
            timer.setTimeAt(days, hr, min, sec);
        }
    }, [startAt]);

    return(
        <span>
            <span style={{...style, display: !displayOverride && 'none'}}>{displayOverride}</span>
            <span ref={clockRef} style={{...style, display: displayOverride && 'none'}}>{ '00:00:00'}</span>
        </span>
    )
}