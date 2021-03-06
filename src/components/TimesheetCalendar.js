import React, { useEffect, useState } from "react";
import { Log } from "../module/logic/Log";
import { useAuth } from "../provider/AuthenticationWrapper";
import $ from 'jquery';
import { DayCard } from "./DayCard";
import { Break } from "../module/logic/Beak";
import { Loading } from "./Loading";
import { FcGlobe } from 'react-icons/fc';
import { Calculator } from "../infrastructure/Calculator";
import { TimeXBreakOption } from "./TimeXBreakOption";
import { QueryDate } from "../module/objects/QueryDate";


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
                if (date == queryObj.parseTimestamp(item?.timestamp).date){
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
            for(let i=0; i < logs?.[key]?.length; i++){
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
const queryObj = new QueryDate();

export const TimesheetCalendar = ({isOpen, user, onCalc, fullMonth, searchBy}) =>{
    const [logsList, setLogsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onShowMore, setOnShowMore] = useState({state: false, log: null, breaks: null});

    const initializeCalendar = async() =>{  
        if (!user) return;  
        setLoading(true);  
        const logCollector = await logs.getLogsByTimestamp(user?.id, searchBy);
        const breakCollector = await breaks.getBreakByTimestamp(user?.id, searchBy);
        manage.init(logCollector?.list() || [], breakCollector?.list() || [], setLogsList);
        setLoading(false);
        onCalc?.({
            total: new Calculator().calculateTime(logCollector?.list() || []),
            logs: logCollector?.list() || [],
            breaks: breakCollector?.list() || [],
        });
    }

    useEffect(()=>{
        if (fullMonth) manage.useFullMonth();
        else manage.useWeekDay();
    }, [fullMonth]);

    useEffect(()=>{
        try{
            if(!isOpen) return;
            if (!searchBy?.fromMonth || !searchBy?.fromYear/* || !searchBy?.toMonth || !searchBy?.toYear*/){
                throw new Error('searchBy must have properties "fromMonth", "fromYear", "toMonth" and "toYear".');
            }
            initializeCalendar();
        }catch(error){
            console.log(error?.message);
        }
    }, [searchBy, user, isOpen]);

    useEffect(()=> manage.init([], [], setLogsList), []);
    
    return(
        <>
        <div hidden={!isOpen} className="relative">
            {logsList?.map((date, key)=>(
                <DayCard
                    key={key}
                    log={date?.log}
                    breaks={date?.breaks}
                    fullMonth={fullMonth}
                    onShowMoreTimes={()=>setOnShowMore({state: true, log: date.log, breaks: date.breaks})}
                />
            ))}
            <div hidden={logsList.length} className="calendar-no-record">
                <FcGlobe/>
                <div>
                    <span>No logs for </span>
                    <span>{searchBy?.month} </span>
                    <span>{searchBy?.year}</span>
                </div>
            </div>
            <Loading loading={loading} relative/>
        </div>
        <TimeXBreakOption
            isOpen={onShowMore.state} 
            log={onShowMore.log} 
            breaks={onShowMore.breaks} 
            onClose={()=>setOnShowMore({state: false, log: null, breaks: null})}
        />
        </>
    )
}