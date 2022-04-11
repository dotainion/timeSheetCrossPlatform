import React from "react";
import shortId from "shortid";
import { DateHelper } from "./DateHelper";
import { time } from "./tools/Time";


const date = new DateHelper();

class Spreadsheet{
    sheets = [];
    result = {
        total: 0,
        errors: {
            sheetInfo: {},
            message: '',
        },
        timeFrom: '',
        timeTo: '',
    }

    getSheet(){
        return this.sheets;
    }

    init(sheet){       
        let firstFilterSheet = JSON.parse(JSON.stringify(sheet?.values));
        const monthTitle = firstFilterSheet.shift();
        const totalColumnTitle= firstFilterSheet.shift();
        const totalTitle = firstFilterSheet.pop();

        let holdFilter = [];
        let tempFilter = [];

        let index = 0;
        firstFilterSheet.forEach((items)=>{
            index ++;
            if (index < 4) tempFilter.push(items);
            else{
                index = 0;
                holdFilter.push(tempFilter);
                tempFilter = [];
            }
        });
        if (tempFilter.length) holdFilter.push(tempFilter);

        let tempSheetR =[];
        holdFilter.forEach((items3Row)=>{
            tempSheetR.push({
                week: date.minizeWeekAndMonth(items3Row?.[0]?.[0]),
                start: items3Row?.[1]?.[0],
                end: items3Row?.[1]?.[1],
                total: items3Row?.[2]?.[0],
                sheetId: sheet?.sheetId,
                title: sheet?.title,
                header: monthTitle?.[monthTitle?.length -1] || '',
                id: shortId.generate()
            });
            tempSheetR.push({
                week: date.minizeWeekAndMonth(items3Row?.[0]?.[2]),
                start: items3Row?.[1]?.[2],
                end: items3Row?.[1]?.[3],
                total: items3Row?.[2]?.[2],
                sheetId: sheet?.sheetId,
                title: sheet?.title,
                header: monthTitle?.[monthTitle?.length -1] || '',
                id: shortId.generate()
            });
            tempSheetR.push({
                week: date.minizeWeekAndMonth(items3Row?.[0]?.[4]),
                start: items3Row?.[1]?.[4],
                end: items3Row?.[1]?.[5],
                total: items3Row?.[2]?.[4],
                sheetId: sheet?.sheetId,
                title: sheet?.title,
                header: monthTitle?.[monthTitle?.length -1] || '',
                id: shortId.generate()
            });
            tempSheetR.push({
                week: date.minizeWeekAndMonth(items3Row?.[0]?.[6]),
                start: items3Row?.[1]?.[6],
                end: items3Row?.[1]?.[7],
                total: items3Row[2][6],
                sheetId: sheet?.sheetId,
                title: sheet?.title,
                header: monthTitle?.[monthTitle?.length -1] || '',
                id: shortId.generate()
            });
            tempSheetR.push({
                week: date.minizeWeekAndMonth(items3Row?.[0]?.[8]),
                start: items3Row?.[1]?.[8],
                end: items3Row?.[1]?.[9],
                total: items3Row?.[2]?.[8],
                sheetId: sheet?.sheetId,
                title: sheet?.title,
                header: monthTitle?.[monthTitle?.length -1] || '',
                id: shortId.generate()
            });
        });
        this.sheets = tempSheetR;
    }

    calculate(sheets=[], exludedIds=[]){
        let total = '0';
        let timeDateFormInvoicing = {};
        sheets?.forEach((sheet)=>{
            let subTotal = null;
            sheet?.forEach((tmv)=>{
                if (exludedIds.includes(tmv.id)) return;
                if(subTotal === null){
                    if (tmv.week) timeDateFormInvoicing['timeFrom'] = tmv.week;
                    subTotal = time.sub(tmv.end, tmv.start);
                }else{
                    if (tmv.week) timeDateFormInvoicing['timeTo'] = tmv.week;
                    let miniTotal = time.sub(tmv.end, tmv.start);
                    subTotal = time.add(subTotal, miniTotal);
                }
            });
            if (subTotal === null) return;
            total = time.add(total, subTotal);
        });
        return {
            total, 
            sheets,
            exludedIds,
            ...timeDateFormInvoicing
        };
    }
}

export class Calculator{

    constructor(){
        this.sheet = new Spreadsheet();
    }
    
    fromSpreadsheet(sheet=[]){
        this.sheet.init(sheet);
        return this.sheet.getSheet();
    }
    
    calculateSheet(sheet=[], exludedIds=[]){
        return this.sheet.calculate(sheet, exludedIds);
    }
}