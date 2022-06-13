import React, { useEffect, useRef, useState } from "react";  
import { Modal } from "../container/Modal";
import { DateHelper } from "../infrastructure/DateHelper";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { AiOutlineClose } from 'react-icons/ai';
import sheetAccount from '../Security/spreadsheet-service.json';
import $ from 'jquery';
import { UserSetting } from '../module/logic/userSetting';
import { useAuth } from "../provider/AuthenticationWrapper";
import { useLocation } from "react-router-dom";
import { Users } from "../module/logic/Users";
import { Layout } from "../layout/Layout";



let date = new Date();
let date2 = new Date();
let month = date.getMonth();
date2.setMonth(date2.getMonth() + 6);
let month6 = date.getMonth();
let year = date.getFullYear();
let year6 = date2.getFullYear();

const api = new Spreadsheet();
const settings = new UserSetting();
const member = new Users();
//1611434837;
//'1oHdNqPtzJNs-gLmI6Dzz62c3qoYrpHFBnYp0w_Ov0vw';
export const MemberSpreadSheetSettings = () =>{
    const {  } = useAuth();

    const [fullMonths, setFullMonths] = useState();

    const location = useLocation();

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

    const onSaveCreds = async() =>{
        if (!location.state?.id) return console.log('invalid user id.');
        await settings.addSetting({
            sheetId: sheetIdRef.current.value,
            spreadsheetId: spreadsheetIdRef.current.value
        }, location.state?.id);
    }

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

        let calendarOption = [];
        const d = new DateHelper();
        for (let i=0; i<d.month().length; i++){
            calendarOption.push({
                title: d.month(i), 
                value: i,
            });
        }
        setFullMonths(calendarOption);
    }, []);

    useEffect(async()=>{
        const userId = location.pathname?.split(':')?.[2] || '';
        const collector = await settings.getSetting(userId);
        const USetting = collector?.first?.();
        sheetIdRef.current.value = USetting?.sheetId || '';
        spreadsheetIdRef.current.value = USetting?.spreadsheetId || '';
        sheetIdRef.current.focus();
        spreadsheetIdRef.current.focus();  
        fromMonthRef.current.focus(); 
        toMonthRef.current.focus();  
        fromYearRef.current.focus(); 
        toYearRef.current.focus(); 
    }, []);

    return(
        <Layout>
            <div className="member-setting">
                <h1>Power up your Spreadsheets</h1>
                <h2>Allow you to access your spreadsheet directly from this app. Providing report on daily, weekly or monthly activities.</h2>
                <Input inputRef={sheetIdRef} onChange={onSaveCreds} title="First Sheet id" />
                <Input inputRef={spreadsheetIdRef} onChange={onSaveCreds} title="Spreadsheet id" />
                <div className="member-setting-client-email">
                    <p>Copy the content bellow and add to your google speadsheet to give this app permission.</p>
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
                    <Button title="Cancel"/>
                </div>
            </div>
        </Layout>
    )
}