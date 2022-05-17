import React, { useEffect, useState } from "react";
import { Log } from "../module/logic/Log";
import { useAuth } from "../provider/AuthenticationWrapper";
import $ from 'jquery';
import { DayCard } from "./DayCard";
import { Break } from "../module/logic/Beak";
import { Loading } from "./Loading";
import { FcGlobe } from 'react-icons/fc';


class manageLog{
    collector = [];
    isFullMonth = false;

    init(logs=[], breaks=[], callBack=null){
        const _month = this.initMonth();
        const _logs = this.initLogsWithCalendarDate(_month, logs);
        const _breaks = this.combindBreaksWithLog(_month, _logs, breaks);
        callBack?.(this.collector);
        return this
    }

    list(){
        return this.collector;
    }

    useFullMonth(){
        this.isFullMonth = true;
    }

    useWeekDay(){
        this.isFullMonth = false;
    }

    findBreaksByLogId(breakList, logId){
        let tempBreakList = [];
        for (let item of breakList || []){
            if (logId == item?.logId){
                tempBreakList.push(item);
            }
        }
        return tempBreakList;
    }

    initMonth(){
        let index = 1;
        let calendarRow = [];
        for (let i=1; i<=35; i++){
            if (this.isFullMonth) calendarRow.push(`${i}`);
            else{
                if (index !== 1 && index != 7) calendarRow.push(`${i}`);
                if (index == 7) index = 1;
                else index ++;
            }
        }
        return calendarRow;
    }

    initLogsWithCalendarDate(month=[], logs=[]){
        let logWithCalendarDate = {};
        for (let date of month){
            for (let item of logs){
                if (date == item?.date){
                    if (!logWithCalendarDate[date]){
                        logWithCalendarDate[date] = [];
                    }
                    logWithCalendarDate[date].push(item);
                }
            }
        }
        return logWithCalendarDate;
    }

    combindBreaksWithLog(month=[], logs=[], breaks=[]){
        let tempCalendarList = [];
        for (let key of month){
            let tempBreaks = [];
            for(let i=0; i<logs?.[key]?.length; i++){
                let tBreaks = this.findBreaksByLogId(breaks, logs?.[key]?.[i]?.id);
                tBreaks?.forEach((b)=>tempBreaks.push(b));
            }
            tempCalendarList.push({
                log: logs[key] || [],
                breaks: tempBreaks
            });
        }
        this.collector = tempCalendarList;
    }
}

const logs = new Log();
const breaks = new Break();
const manage = new manageLog();

export const TimesheetCalendar = ({isOpen, user, fullMonth, searchBy, onShowMore}) =>{
    const { } = useAuth();

    const [logsList, setLogsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasData, setHasData] = useState(false);

    const initializeCalendar = async(month="", year="") =>{   
        if (!user) return;  
        setLoading(true);   
        const logCollector = await logs.getLogsByMonth(user?.id, searchBy?.month || month, searchBy?.year || year);
        const breakCollector = await breaks.getBreakByMonth(user?.id, searchBy?.month || month, searchBy?.year || year);
        manage.init(logCollector.list(), breakCollector.list(), setLogsList);
        setHasData(logCollector.hasItems());
        setLoading(false);
    }

    useEffect(()=>{
        if (fullMonth) manage.useFullMonth();
        else manage.useWeekDay();
    }, [fullMonth]);

    useEffect(()=>{
        try{
            if (!searchBy?.month || !searchBy?.year){
                throw new Error('searchBy must have properties "month" and "year".');
            }
            initializeCalendar();
        }catch(error){
            console.log(error?.message);
        }
    }, [searchBy]);

    useEffect(()=> manage.init([], [], setLogsList), []);
    
    return(
        <div hidden={!isOpen} className="relative">
            {logsList?.map((date, key)=>(
                <DayCard
                    key={key}
                    log={date?.log}
                    breaks={date?.breaks}
                    fullMonth={fullMonth}
                    onShowMoreTimes={()=>onShowMore(date)}
                />
            ))}
            <div hidden={hasData} className="calendar-no-record">
                <FcGlobe/>
                <div>
                    <span>No logs for </span>
                    <span>{searchBy?.month} </span>
                    <span>{searchBy?.year}</span>
                </div>
            </div>
            <Loading loading={loading} relative/>
        </div>
    )
}