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
export const ReportCalendar = memo(({sheets, onCalculate}) =>{

    const navigate = useNavigate();
    const location = useLocation();

    const addExcluded = (checked, id) =>{
        if (checked){
            let tempIds = [];
            for(let ids of excludeTimeCardIds){
                if (ids !== id) tempIds.push(ids);
            }
            excludeTimeCardIds = tempIds;
        }else{
            excludeTimeCardIds.push(id); 
        }
        runCalculation();
    } 

    const runCalculation = async() =>{
        const calc = new Calculator();
        const result = calc.calculateSheet(
            sheets, 
            excludeTimeCardIds
        );
        onCalculate?.(result);
    };

    useEffect(()=>{
        if (sheets.length){
            navigate(`${sheets?.[sheets?.length -1]?.[0]?.sheetId}`);
        }
        runCalculation();

        return () =>{
            
        }
    }, [sheets]);

    return(
        <div>
            <Routes>
                <Route path="" element={<div>hellow orld</div>} />
            </Routes>
            <div className="report-tab-container">
                {sheets?.map((tab, key)=>(
                    <div 
                        onClick={()=>navigate(`${tab?.[0]?.sheetId}`)}
                        className={`${location.pathname.includes(tab?.[0]?.sheetId) && 'report-tab-active'}`}
                        key={key}
                    >{tab?.[0]?.title}</div>
                ))}
            </div>
            {
                sheets?.length ?
                sheets?.map((sheets, key)=>(
                    <Routes key={key}>
                        <Route path={`/${sheets?.[0]?.sheetId}`} element={
                            <CalendarComponent
                                sheets={sheets}
                                onExclude={(checked, id)=>addExcluded(checked, id)}
                            />
                        } />
                    </Routes>
                )) :
                <NoRecords
                    image={reportNone}
                    title="To see report"
                    btnName="none"
                    messages={[
                        "Select a sheet from the list above",
                    ]}
                    onClick={()=>{}}
                />
            }
        </div>
    )
});


const CalendarComponent = memo(({sheets, onExclude}) =>{
    const [toggSelcAll, setToggSelcAll] = useState(true);

    return(
        <div>
            <div className="calendar-header">
                <div className="calendar-select-all">
                    <RadioButton onChange={setToggSelcAll} title={toggSelcAll? 'Deselect All': 'Select All'} defaultSelect={true} />
                </div>
                <span>{sheets?.[0]?.header}</span>
            </div>
            {sheets?.map((val, key)=>(
                <div className="calendar-container" key={key}>
                    <div className="calendar-week">
                        <div className="calendar-exempt-btn" hidden={!val?.week}>
                            <RadioButton onChange={(checked)=>onExclude?.(checked, val.id)} defaultSelect={toggSelcAll} />
                        </div>
                        <div className="calendar-full">
                            <EllipsisOverflow>{val.week || '-'}</EllipsisOverflow>
                        </div>
                        <div className="calendar-time">
                            <div className="relative">
                                <EllipsisOverflow>{val.start || '-'}</EllipsisOverflow>
                                <Editable value={val.start} />
                            </div>
                            <div className="relative">
                                <EllipsisOverflow>{val.end || '-'}</EllipsisOverflow>
                                <Editable value={val.end} />
                            </div>
                        </div>
                        <div className="calendar-result">
                            <EllipsisOverflow>{val.total || '-'}</EllipsisOverflow>
                        </div>
                        <Breaks/>
                    </div>
                </div>
            ))}
        </div>
    )
});