import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Modal } from "../container/Modal";
import { DateHelper } from "../infrastructure/DateHelper";
import { QueryDate } from "../module/logic/QueryDate";
import $ from 'jquery';

const date = new DateHelper();
const validateDateObject = new QueryDate();

export const LogRangePicker = ({isOpen, onClose, onSelected}) =>{
    const [selectRange, setSelectRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const pickerRef = useRef();

    const handleSelect = (ranges) =>{
        setSelectRange(ranges.selection);
        onSelected?.(
            validateDateObject.sanitize({
                fromMonth: date.monthMini((new Date(ranges.selection.startDate).getMonth())),
                fromYear: (new Date(ranges.selection.startDate)).getFullYear(),
                toMonth: date.monthMini((new Date(ranges.selection.endDate).getMonth())),
                toYear: (new Date(ranges.selection.endDate)).getFullYear(),
                fromDate: (new Date(ranges.selection.startDate)).getDate(),
                fromWeek: date.weekMini((new Date(ranges.selection.startDate)).getDay()),
                toDate: (new Date(ranges.selection.endDate)).getDate(),
                toWeek: date.weekMini((new Date(ranges.selection.endDate)).getDay()),
                from: new Date(ranges.selection.startDate),
                to: new Date(ranges.selection.endDate),
                fromInt: (new Date(ranges.selection.startDate)).getTime(),
                toInt: (new Date(ranges.selection.endDate)).getTime()
            })
        );
    }

    const selectionRange = {
        startDate: selectRange.startDate,
        endDate: selectRange.endDate,
        key: 'selection',
    }

    useEffect(()=>{
        isOpen 
            ? $(pickerRef.current).show('fast')
            : $(pickerRef.current).hide('fast');
    }, [isOpen]);

    return(
        <div ref={pickerRef} onClick={onClose} className="backdrop">
            <div onClick={(e)=>e.stopPropagation()} className="log-range-picker">
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
            </div>
        </div>
    )
}