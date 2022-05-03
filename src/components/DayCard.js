import React, { useEffect, useRef, useState } from "react";
import { time } from "../infrastructure/tools/Time";
import { Breaks } from "../widgets/Breaks";
import { Editable } from "../widgets/Editable";
import { EllipsisOverflow } from "../widgets/EllipsisOverflow";
import $ from 'jquery';
import { Validation } from "../infrastructure/Validation";
import { Log } from "../module/logic/Log";


const validate = new Validation();
const lLog = new Log();

export const DayCard = ({log, breaks, fullMonth, onShowMoreTimes, style, cssClass}) =>{
    const dayCardRef = useRef();
    const logRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const totalRef = useRef();

    const updateLog = (uLog) =>{
        lLog.updateTime(
            uLog.id, 
            uLog.date, 
            uLog.month, 
            uLog.year, 
            uLog.week, 
            uLog.startTime, 
            uLog.endTime, 
            uLog.userId
        );
    }

    const onChange = (cmd, e) =>{
        const value = e.currentTarget.value;
        if (!logRef.current){
            return e.currentTarget.value = '';
        }
        if (validate.isTimeValid(value)?.error){
            if (cmd === 'start') e.currentTarget.value = logRef.current.startTime;
            if (cmd === 'end') e.currentTarget.value = logRef.current.endTime;
            return;
        }
        if (cmd === 'start'){
            logRef.current.startTime  = value;
            $(startRef.current).text(value);
        }
        if (cmd === 'end'){
            logRef.current.endTime  = value;
            $(endRef.current).text(value);
        }
        $(totalRef.current).text(
            time.sub(
                logRef.current.endTime, 
                logRef.current.startTime
            )
        );
        updateLog(logRef.current);
    }

    useEffect(()=>{
        if (log?.length){
            logRef.current = log?.[log?.length -1];
        }
    }, [log]);
    return(
        <div ref={dayCardRef} className={`calendar-container ${cssClass}`} style={{width: fullMonth && '14.28%', ...style}}>
            <div className="calendar-week">
                {log?.length > 1 ? <div onClick={onShowMoreTimes} className="calendar-start-x">{log?.length} X</div> : null}
                <div className="calendar-full">
                    <EllipsisOverflow>{`${log?.[log?.length -1]?.month || ''} ${log?.[log?.length -1]?.date || ''} ${log?.[log?.length -1]?.year || ''}`}</EllipsisOverflow>
                </div>
                <div className="calendar-time">
                    <div className="relative">
                        <EllipsisOverflow ellipsisRef={startRef}>{log?.[log?.length -1]?.startTime}</EllipsisOverflow>
                        <Editable onChange={(e)=>onChange('start', e)} value={log?.[log?.length -1]?.startTime} />
                    </div>
                    <div className="relative">
                        <EllipsisOverflow ellipsisRef={endRef}>{log?.[log?.length -1]?.endTime}</EllipsisOverflow>
                        <Editable onChange={(e)=>onChange('end', e)} value={log?.[log?.length -1]?.endTime} />
                    </div>
                </div>
                <div className="calendar-result">
                    {log?.[log?.length -1]?.endTime ? <EllipsisOverflow ellipsisRef={totalRef}>{time.sub(log?.[log?.length -1]?.endTime, log?.[log?.length -1]?.startTime)}</EllipsisOverflow> : <span style={{color: 'transparent'}}>.</span>}
                </div>
                {breaks?.length ? <Breaks breaks={breaks} log={log} /> : null}
            </div>
        </div>
    )
}