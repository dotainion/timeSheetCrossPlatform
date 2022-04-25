import React from "react";
import { time } from "../infrastructure/tools/Time";
import { Breaks } from "../widgets/Breaks";
import { Editable } from "../widgets/Editable";
import { EllipsisOverflow } from "../widgets/EllipsisOverflow";


export const DayCard = ({log, breaks, fullMonth, onShowMoreTimes, style, cssClass}) =>{
    return(
        <div className={`calendar-container ${cssClass}`} style={{width: fullMonth && '14.28%', ...style}}>
            <div className="calendar-week">
                {log?.length > 1 ? <div onClick={onShowMoreTimes} className="calendar-start-x">{log?.length} X</div> : null}
                <div className="calendar-full">
                    <EllipsisOverflow>{`${log?.[log?.length -1]?.month || ''} ${log?.[log?.length -1]?.date || ''} ${log?.[log?.length -1]?.year || ''}`}</EllipsisOverflow>
                </div>
                <div className="calendar-time">
                    <div className="relative">
                        <EllipsisOverflow>{log?.[log?.length -1]?.startTime}</EllipsisOverflow>
                        <Editable value={log?.[log?.length -1]?.startTime} />
                    </div>
                    <div className="relative">
                        <EllipsisOverflow>{log?.[log?.length -1]?.endTime}</EllipsisOverflow>
                        <Editable value={log?.[log?.length -1]?.endTime} />
                    </div>
                </div>
                <div className="calendar-result">
                    {log?.[log?.length -1]?.endTime ? <EllipsisOverflow>{time.sub(log?.[log?.length -1]?.endTime, log?.[log?.length -1]?.startTime)}</EllipsisOverflow> : <span style={{color: 'transparent'}}>.</span>}
                </div>
                {breaks?.length ? <Breaks breaks={breaks} /> : null}
            </div>
        </div>
    )
}