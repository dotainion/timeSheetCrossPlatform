import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { DateHelper } from "../infrastructure/DateHelper";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const date = new DateHelper();

let revertDate = {month: '', year: ''};
export const LogPicker = ({month:Month, year:Year, isOpen, onClose, onChange}) =>{
    const [year, setYear] = useState((new Date()).getFullYear());

    const datePickerRef = useRef();

    const onSelectDate = (month) =>{
        onChange?.({year: `${year}`, month: month});
    }

    const onRevertDate = () =>{
        onChange?.(revertDate);
        onClose?.();
    }

    useEffect(()=>{
        if (isOpen){
            revertDate = {month: Month, year: Year};
            $(datePickerRef.current).show('fast');
        }else{
            $(datePickerRef.current).hide('fast');
        }
    }, [isOpen]);
    return(
        <div ref={datePickerRef} onClick={onClose} className="log-picker-container-backdrop">
            <div onClick={(e)=>e.stopPropagation()} className="log-picker-container">
                <div className="log-picker">
                    <div className="log-picker-info">
                        <div>PRESETS</div>
                        <p>this month pass months...</p>
                    </div>
                    <div className="log-picker-range">
                        <div>SELECT A MONTH RANGE:</div>
                        <div className="log-picker-year">
                            <IoIosArrowDropleftCircle onClick={()=>setYear(year -1)} />
                            <div>{year}</div>
                            <IoIosArrowDroprightCircle onClick={()=>setYear(year +1)} />
                        </div>
                        {
                            date.monthMini().map((title, key)=>(
                                <div data-month="true" key={key}>
                                    <div onClick={()=>onSelectDate(title)}>{title}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="log-picker-btn-container">
                    <button onClick={onRevertDate}>cancel</button>
                    <button onClick={onClose}>ok</button>
                </div>
            </div>
        </div>
    )
}