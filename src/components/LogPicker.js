import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { DateHelper } from "../infrastructure/DateHelper";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { Button } from "../widgets/Button";
import logo from '../images/logo.png';

const date = new DateHelper();

export const LogPicker = ({revertTo, isOpen, onClose, onChange}) =>{
    const [year, setYear] = useState((new Date()).getFullYear());
    const [isRange, setIsRange] = useState(false);
    const [isFrom, setIsFrom] = useState(false);
    const [dateRange, setDateRange] = useState({
        fromYear: '', 
        toYear: '', 
        fromMonth: '', 
        toMonth: ''
    });

    const datePickerRef = useRef();

    const onSelectDate = (month) =>{
        if(isRange){
            if(isFrom) setDateRange({
                fromYear: `${JSON.parse(JSON.stringify(year))}`, 
                toYear: dateRange.toYear, 
                fromMonth: `${JSON.parse(JSON.stringify(month))}`, 
                toMonth: dateRange.toMonth
            });
            else setDateRange({
                fromYear: dateRange.fromYear, 
                toYear: `${JSON.parse(JSON.stringify(year))}`, 
                fromMonth: dateRange.fromMonth, 
                toMonth: `${JSON.parse(JSON.stringify(month))}`
            });
            return;
        }
        onChange?.({fromYear: `${year}`, toYear: '', fromMonth: month, toMonth: ''});
    }

    const onRevertDate = () =>{
        onChange?.({
            fromYear: revertTo?.fromYear || '',
            toYear: revertTo?.toYear || '',
            fromMonth: revertTo?.fromMonth || '',
            toMonth: revertTo?.toMonth || ''
        });
        onClose?.();
    }

    const isActiveDate = (d) =>{
        if (d == date.monthMini((new Date()).getMonth())){
            return 'log-picker-btn-active';
        }
        return '';
    }

    const isActiveYear = (y) =>{
        if (y == (new Date()).getFullYear()){
            return 'log-picker-btn-active-bold';
        }
        return '';
    }

    useEffect(()=>{
        if (isOpen) $(datePickerRef.current).show('fast');
        else $(datePickerRef.current).hide('fast');
    }, [isOpen]);

    useEffect(()=>{
        if(isRange){
            const month = isFrom ? dateRange.fromMonth : dateRange.toMonth;
            onSelectDate(month || date.monthMini((new Date()).getMonth()));
        }
    }, [year]);

    useEffect(()=>{
        if(!dateRange.fromYear && !dateRange.fromMonth) return;
        return onChange?.(dateRange);
    }, [dateRange]);

    return(
        <div ref={datePickerRef} onClick={onClose} className="log-picker-container-backdrop">
            <div onClick={(e)=>e.stopPropagation()} className="log-picker-container">
                <div className="log-picker">
                    <div className="log-picker-info">
                        <div>TIME PICKER</div>
                        <h6>Select by month</h6>
                        <img src={logo} alt="" />
                        <div className="log-picker-from-to">
                            <div>
                                <button onClick={()=>setIsRange(false)} className={`${!isRange && 'log-picker-from-to-selected'}`}>Select</button>
                                <button onClick={()=>setIsRange(true)} className={`${isRange && 'log-picker-from-to-selected'}`}>Range</button>
                                <div hidden={!isRange}>
                                    <button onClick={()=>setIsFrom(false)} className={`${!isFrom && 'log-picker-from-to-selected'}`}>From</button>
                                    <button onClick={()=>setIsFrom(true)} className={`${isFrom && 'log-picker-from-to-selected'}`}>To</button>
                                    <div hidden={!isFrom} data-date-visible>{dateRange.fromMonth}/{dateRange.fromYear}</div>
                                    <div hidden={isFrom} data-date-visible>{dateRange.toMonth}/{dateRange.toYear}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="log-picker-range">
                        <div>SELECT A MONTH RANGE:</div>
                        <div className="log-picker-year">
                            <IoIosArrowDropleftCircle onClick={()=>setYear(year -1)} />
                            <div className={isActiveYear(year)}>{year}</div>
                            <IoIosArrowDroprightCircle onClick={()=>setYear(year +1)} />
                        </div>
                        {
                            date.monthMini().map((title, key)=>(
                                <div data-month key={key}>
                                    <div 
                                        onClick={()=>onSelectDate(title)} 
                                        className={isActiveDate(title)}
                                    >{title}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="log-picker-btn-container">
                    <Button onClick={onRevertDate} title={'cancel'} />
                    <Button onClick={onClose} title={'ok'} />
                </div>
            </div>
        </div>
    )
}