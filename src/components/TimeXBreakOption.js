import React, { useEffect } from "react";
import { Modal } from "../container/Modal";
import { DayCard } from "./DayCard";
import { AiFillCloseSquare } from 'react-icons/ai';


export const TimeXBreakOption = ({isOpen, onClose, log, breaks}) =>{
    useEffect(()=>{

    }, [log, breaks]);
    return(
        <Modal isOpen={isOpen}>
            <div onClick={(e)=>e.stopPropagation()} className="clock-in-x-option-overlay-inner">
                <div className="clock-in-x-break-card-heading">
                    <span>Time and break</span>
                    <AiFillCloseSquare onClick={onClose} />
                </div>
                <BreakHeader cssClass={'hide-on-mobile'} />
                <div className="clock-in-x-flexer">
                    <div className="clock-in-x-logs">
                        {log?.map((item, key)=>(
                            <DayCard
                                key={key}
                                log={[item]}
                                cssClass="clock-in-day-card"
                            />
                        ))}
                    </div>
                    <div className="clock-in-x-break">
                        <BreakHeader cssClass={'hide-on-desktop block-on-deskop'} />
                        {breaks?.map((item, key)=>(
                            <div className="clock-in-break-card" key={key}>
                                <div>{item?.startBreak}</div>
                                <div>{item?.endBreak}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const BreakHeader = ({cssClass}) =>{
    return(
        <div className={`clock-in-x-flexer-header ${cssClass} max-width-on-mobile`}>
            <div className="clock-in-x-logs-header max-width-on-mobile"></div>
            <div className="clock-in-x-break-header max-width-on-mobile">
                <div className="clock-in-break-card-header">
                    <div>Start</div>
                    <div>End</div>
                </div>
            </div>
        </div>
    )
}