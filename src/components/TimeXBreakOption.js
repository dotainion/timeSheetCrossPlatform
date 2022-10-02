import React, { useEffect } from "react";
import { Modal } from "../container/Modal";
import { DayCard } from "./DayCard";
import { AiFillCloseSquare } from 'react-icons/ai';


export const TimeXBreakOption = ({isOpen, onClose, log, breaks}) =>{
    useEffect(()=>{

    }, [log, breaks]);
    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Time and break">
            <div className="d-flex w-100">
                <div className=" w-100"></div>
                <div className="d-flex w-sm-50 w-100 px-1" style={{fontSize: '13px'}}>
                    <div className="w-100">Start</div>
                    <div className="w-100">End</div>
                </div>
            </div>
            <div onClick={(e)=>e.stopPropagation()} className="d-sm-flex">
                <div className="clock-in-x-logs w-100">
                    {log?.map((item, key)=>(
                        <DayCard
                            key={key}
                            log={[item]}
                            cssClass="clock-in-day-card"
                        />
                    ))}
                </div>
                <div className="clock-in-x-logs w-sm-50 w-100 px-1">
                    {breaks?.map((item, key)=>(
                        <div className="d-flex text-nowrap w-100" key={key} style={{fontSize: '13px'}}>
                            <div className="w-100">{item?.startBreak}</div>
                            <div className="w-100">{item?.endBreak}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}