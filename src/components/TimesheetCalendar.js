import React, { useEffect, useState } from "react";
import { Breaks } from "../widgets/Breaks";
import { Editable } from "../widgets/Editable";
import { EllipsisOverflow } from "../widgets/EllipsisOverflow";


export const TimesheetCalendar = ({isOpen, fullMonth, logs}) =>{
    const [logsList,setLogsList] = useState([]);

    useEffect(()=>{
        setLogsList([...Array(25).keys()]);
    }, [logs]);
    return(
        <div hidden={!isOpen}>
            {
                logsList?.length ?
                logsList?.map((date, key)=>(
                    <div className="calendar-container" style={{width: fullMonth && '14.28%'}} key={key}>
                        <div className="calendar-week">
                            <div className="calendar-full">
                                <EllipsisOverflow>{date?.date || '-'}</EllipsisOverflow>
                            </div>
                            <div className="calendar-time">
                                <div className="relative">
                                    <EllipsisOverflow>{date?.start || '-'}</EllipsisOverflow>
                                    <Editable value={date?.start} />
                                </div>
                                <div className="relative">
                                    <EllipsisOverflow>{date?.end || '-'}</EllipsisOverflow>
                                    <Editable value={date?.end} />
                                </div>
                            </div>
                            <div className="calendar-result">
                                <EllipsisOverflow>{date?.total || '-'}</EllipsisOverflow>
                            </div>
                            <Breaks/>
                        </div>
                    </div>
                )):
                <div>
                    <div>No Records</div>
                </div>
            }
        </div>
    )
}