import React, { useEffect, useRef, useState } from "react";  
import { Modal } from "../container/Modal";
import { ModalXl } from "../container/ModalXl";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { AiOutlineClose } from 'react-icons/ai';
import sheetAccount from '../Security/spreadsheet-service.json';
import $ from 'jquery';



let date = new Date();
let date2 = new Date();
let month = date.getMonth();
date2.setMonth(date2.getMonth() + 6);
let month6 = date.getMonth();
let year = date.getFullYear();
let year6 = date2.getFullYear();

const api = new Spreadsheet();
//1611434837;
//'1oHdNqPtzJNs-gLmI6Dzz62c3qoYrpHFBnYp0w_Ov0vw';
export const MemberSettings = ({isOpen, onClose}) =>{
    const sheetIdRef = useRef();  
    const spreadsheetIdRef = useRef();   
    const fromMonthRef = useRef();  
    const toMonthRef = useRef(); 
    const fromYearRef = useRef();  
    const toYearRef = useRef();

    const onGenerate = () =>{
        const fDate = new Date();
        const tDate = new Date();
        tDate.setMonth(tDate.getMonth() +6);
        api.clone(spreadsheetIdRef.current.value, sheetIdRef.current.value, {
            fromMonth: fDate.getMonth(),
            fromYear: fDate.getFullYear(),
            toMonth: tDate.getMonth(),
            toYear: tDate.getFullYear(), 
        });
    }

    const onGenerateRange = () =>{
        api.clone(spreadsheetIdRef.current.value, sheetIdRef.current.value, {
            fromMonth: parseInt(fromMonthRef.current.value || 0),
            fromYear: parseInt(fromYearRef.current.value || 0),
            toMonth: parseInt(toMonthRef.current.value || 0),
            toYear: parseInt(toYearRef.current.value || 0), 
        });
    }

    const fullMonths = [
        { title: 'January', value: 0 },
        { title: 'February', value: 1 },
        { title: 'March', value: 2 },
        { title: 'April', value: 3 },
        { title: 'May', value: 4 },
        { title: 'June', value: 5 },
        { title: 'July', value: 6 },
        { title: 'August', value: 7 },
        { title: 'September', value: 8 },
        { title: 'October', value: 9 },
        { title: 'November', value: 10 },
        { title: 'December', value: 11 }
    ];

    const getYear = (amount=6) =>{
        return [...Array(amount).keys()].map((y)=>{
            return { title: year +y }
        });
    }

    useEffect(()=>{
        $(sheetIdRef.current).blur(()=>{

        });
        $(spreadsheetIdRef.current).blur(()=>{

        });
    }, []);

    useEffect(()=>{
        sheetIdRef.current.value = '';
        spreadsheetIdRef.current.value = '';
        sheetIdRef.current.focus();
        spreadsheetIdRef.current.focus();  
        fromMonthRef.current.focus(); 
        toMonthRef.current.focus();  
        fromYearRef.current.focus(); 
        toYearRef.current.focus(); 
    }, [isOpen]);

    return(
        <Modal isOpen={isOpen}>
            <div className="member-setting">
                <h1>
                    <span>Power up your Spreadsheets</span>
                    <AiOutlineClose onClick={onClose} className="modal-xl-close"/>
                </h1>
                <h2>Allow you to access your spreadsheet directly from this app. Providing report on daily, weekly or monthly activities.</h2>
                <Input inputRef={sheetIdRef} title="First Sheet id" />
                <Input inputRef={spreadsheetIdRef} title="Spreadsheet id" />
                <div className="member-setting-client-email">
                    <p>Copy the content bellow and to your spead sheet to give this app permission.</p>
                    <div>{sheetAccount.client_email}</div>
                </div>
                <div className="member-setting-btn-container">
                    <Button onClick={onGenerate} title="Generate 6 months"/>
                </div>
                <p>Tab will generate calendar date entry base on each month.</p>
                <div className="member-setting-options">
                    <div className="member-setting-opt">
                        <Input inputRef={fromMonthRef} title="Month from" options={fullMonths} defaultOption={month} />
                    </div>
                    <div className="member-setting-opt">
                        <Input inputRef={fromYearRef} title="Year from" options={getYear()} defaultOption={year} />
                    </div>
                </div>
                <div className="member-setting-options">
                    <div className="member-setting-opt">
                        <Input inputRef={toMonthRef} title="Month to" options={fullMonths} defaultOption={month6} />
                    </div>
                    <div className="member-setting-opt">
                        <Input inputRef={toYearRef} title="Year to" options={getYear()} defaultOption={year6} />
                    </div>
                </div>
                <div className="member-setting-btn-container">
                    <Button onClick={onGenerateRange} title="Generate"/>
                    <Button onClick={onClose} title="Cancel"/>
                </div>
            </div>
        </Modal>
    )
}