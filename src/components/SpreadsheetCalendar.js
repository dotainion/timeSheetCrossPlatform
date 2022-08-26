import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import axis from 'axios';
import { EllipsisOverflow } from "../widgets/EllipsisOverflow";
import $ from 'jquery';
import { time } from "../infrastructure/tools/Time";
import { RadioButton } from "../widgets/RadioButton";
import shortId from 'shortid';
import { Editable } from "../widgets/Editable";
import { DateHelper } from "../infrastructure/DateHelper";
import { Breaks } from "../widgets/Breaks";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Calculator } from "../infrastructure/Calculator";
import { NoRecords } from "./NoRecords";
import reportNone from '../images/report-none.png';


const date = new DateHelper();

let excludeTimeCardIds = [];
export const SpreadsheetCalendar = memo(({isOpen, sheets, onCalculate}) =>{
    const calendarRef = useRef();
    const intervalRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();

    const calculation = (checked, id) =>{
        let logs = [];
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(()=>{
            $(calendarRef.current).find('[data-calendar]').each((i, calendar)=>{
                if($(calendar).find('input[type=radio]')[0].checked){
                    const date = $(calendar).find('[data-time=date]');
                    const start = $(calendar).find('[data-time=start]');
                    const end = $(calendar).find('[data-time=end]');
                    if(!$(start).text().replace('-', '') || !$(end).text().replace('-', '')) return;
                    logs.push({
                        startTime: $(start).text(), 
                        endTime: $(end).text(),
                        timestamp: new Date($(date).text()).getTime(),
                        id: shortId.generate(),
                    });
                }
            });
            const calc = new Calculator();
            console.log(logs);
            onCalculate?.({total: calc.calculateTime(logs), logs});
        }, 50);
    };

    const onDisplay = (id) =>{
        sheets?.forEach((tab)=>{
            $(`#${tab?.id}`).removeClass('d-none').hide();
            $(`#tab-${tab?.id}`).removeClass('report-tab-active').show();
        });
        $(`#${id}`).removeClass('d-none').show('fast');
        $(`#tab-${id}`).addClass('report-tab-active').show();
    }

    useEffect(()=>{
        if(!isOpen || !sheets?.length) return;
        onDisplay(`${sheets?.[0]?.id}`);
        calculation();
        return () =>{}
    }, [sheets, isOpen]);

    return(
        <div ref={calendarRef} hidden={!isOpen}>
            <div className="report-tab-container">
                {sheets?.map((tab, key)=>(
                    <div 
                        onClick={()=>onDisplay(tab?.id)}
                        id={`tab-${tab?.id}`}
                        key={key}
                    >{tab?.header}</div>
                ))}
            </div>
            {
                sheets?.length ?
                sheets?.map((data, key)=>(
                    <div className="d-none" id={data?.id} key={key}>
                        <CalendarComponent 
                            sheets={data} 
                            onExclude={calculation}
                        />
                    </div>
                )) :
                <NoRecords
                    image={reportNone}
                    title="To see report"
                    btnName="none"
                    messages={["Select a sheet from the list above"]}
                    onClick={()=>{}}
                />
            }
        </div>
    )
});


const CalendarComponent = memo(({sheets, onExclude}) =>{
    const [toggSelcAll, setToggSelcAll] = useState(true);

    useEffect(()=>{

    }, []);
    return(
        <div>
            <div className="calendar-header">
                <div className="calendar-select-all ms-4">
                    <RadioButton onChange={setToggSelcAll} title={toggSelcAll? 'Deselect All': 'Select All'} defaultSelect={false} />
                </div>
                <span className="float-end pe-4">{sheets?.header}</span>
            </div>
            {sheets?.sheet?.map((val, key)=>(
                <div className="calendar-container" data-calendar key={key}>
                    <div className="calendar-week">
                        <div className="calendar-exempt-btn" hidden={!val?.week}>
                            <RadioButton onChange={onExclude} defaultSelect={toggSelcAll} />
                        </div>
                        <div className="calendar-full">
                            <EllipsisOverflow timeType={'date'}>{val.week || '-'}</EllipsisOverflow>
                        </div>
                        <div className="calendar-time">
                            <div className="relative">
                                <EllipsisOverflow timeType={'start'}>{val.start || '-'}</EllipsisOverflow>
                                <Editable value={val.start} />
                            </div>
                            <div className="relative">
                                <EllipsisOverflow timeType={'end'}>{val.end || '-'}</EllipsisOverflow>
                                <Editable value={val.end} />
                            </div>
                        </div>
                        <div className="calendar-result">
                            <EllipsisOverflow>{val.start && time.sub(val.end, val.start) + ' Hours' || '-'}</EllipsisOverflow>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
});