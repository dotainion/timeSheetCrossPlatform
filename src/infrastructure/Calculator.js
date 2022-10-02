import React from "react";
import shortId from "shortid";
import { Collector } from "./Collector";
import { DateHelper } from "./DateHelper";
import { time } from "./tools/Time";


const date = new DateHelper();

class Spreadsheet{
    list = [];

    sheets(){
        return this.list;
    }

    dataToCalendarList(dataSheet){   
        for(let item of dataSheet){
            let tempSheet = [];
            const monthTitle = item.shift();
            const totalColumnTitle = item.shift();
            const totalTitle = item.pop();
            for(let s of [0, 4, 8, 12, 16]){
                for(let i of [0, 2, 4, 6, 8]){
                    tempSheet.push({
                        week: date.minizeWeekAndMonth(item?.[s]?.[i]),
                        start: item?.[1+s]?.[i],
                        end: item?.[1+s]?.[1+i],
                        total: item?.[2+s]?.[i],
                        sheetId: dataSheet?.sheetId,
                        title: dataSheet?.title
                    });
                }
            }
            this.list.push({
                sheet: tempSheet,
                id: shortId.generate(),
                header: monthTitle?.[monthTitle?.length -1] || ''
            });
        }
    }
}

class TimeSheet{
    hours = null;

    toTotalTime(logs=[]){
        logs?.forEach((log)=>{
            if (!this.hours){
                return this.hours = time.sub(log.endTime, log.startTime);
            }
            const tTime = time.sub(log.endTime, log.startTime);
            this.hours = time.add(this.hours, tTime);
        });
        return this;
    }

    toTotalTimeLoop(logs=[]){
        logs?.forEach((log)=>{
            this.toTotalTime(log);
        });
        return this;
    }

    get(){
        const hours = this.hours;
        this.hours = null;
        return hours;
    }
}

export class Calculator extends Collector{
    constructor(){
        super();
        this.sheet = new Spreadsheet();
        this.time = new TimeSheet();
    }
    
    spreadsheetCollection(){
        this.sheet.dataToCalendarList(this.list());
        return this.sheet.sheets();
    }
    
    calculateSheet(sheet=[], exludedIds=[]){
        return this.sheet.calculate(sheet, exludedIds);
    }

    calculateTime(logs=[]){
        this.time.toTotalTime(logs);
        return this.time.get();
    }

    calculateTimeLoop(logs=[]){
        this.time.toTotalTimeLoop(logs);
        return this.time.get();
    }

    setExtra(key, value){
        this.sheet.extra[key] = value;
    }
}