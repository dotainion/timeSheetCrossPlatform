import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpreadsheetCalendar } from "../components/SpreadsheetCalendar";
import { Layout } from "../layout/Layout";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { Users } from "../module/logic/Users";
import { MultiSelect } from "../widgets/MultiSelect";
import { DateHelper } from "../infrastructure/DateHelper";
import $ from 'jquery';
import { Button } from "../widgets/Button";
import { Invoice } from "../components/Invoice";
import { Loading } from "../components/Loading";
import { Calculator } from "../infrastructure/Calculator";
import { UserSetting } from "../module/logic/userSetting";
import { useAuth } from "../provider/AuthenticationWrapper";
import { TimesheetCalendar } from "../components/TimesheetCalendar";
import { SiTeamviewer } from 'react-icons/si';
import { LogPicker } from '../components/LogPicker';


const mbr = new Users();
const date = new Date();
const api = new Spreadsheet();
const dateHelper = new DateHelper();
const setting = new UserSetting();
const calc = new Calculator();

let sheetCollector = [];
export const Report = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [searchBy, setSearchBy] = useState({month: dateHelper.monthMini(date.getMonth()), year: `${date.getFullYear()}`});
    const [openLogPicker, setOpenLogPicker] = useState(false);
    const [toggleCalendar, setToggleCalendar] = useState(false);
    const [sheets, setSheets] = useState([]);
    const [member, setMember] = useState();
    const [loading, setLoading] = useState(false);
    const [openInvoice, setOpenInvoice] = useState(false);
    const [availableSheets, setAvailableSheets] = useState([]);
    const [totals, setTotals] = useState({
        totalTime: 0, 
        timeFrom: '', 
        timeTo: ''
    });
    const [spreadsheetId, setSpreadsheetId] = useState();

    const location = useLocation();

    const getFromStorge = (title) =>{
        return sheetCollector.filter((item)=>item?.[0].title === title);
    }

    const fetchSheet = async(sheetList=[]) =>{
        setLoading(true);

        let tempSheetCollector = [];
        for(let item of sheetList){
            const collected = getFromStorge(item?.title);
            if (collected?.length){
                tempSheetCollector.push(collected[0]);
            }else{
                const sheet = await api.getSheet(item?.title, spreadsheetId);
                if (sheet?.error){
                    return setLoading(false);
                }

                const calc = new Calculator();
                const record = {...item, values: sheet.data.data.values};
                const calulated = calc.fromSpreadsheet(record);
                sheetCollector.push(calulated);
                tempSheetCollector.push(calulated);
            }
        };

        setSheets(tempSheetCollector);

        setLoading(false);
    }

    const initSheets = (sheets=[]) =>{
        const transSheets = sheets.map((sheet)=>{
            return {
                sheetId: sheet.properties.sheetId,
                title: sheet.properties.title
            }
        });
        setAvailableSheets(transSheets);
    }

    const initialize = async() =>{
        const res = await api.getSpreadsheet(spreadsheetId);
        if (res?.error){
            return;
        }
        const response = res.data.sheets;
        initSheets(response);
    }

    const calculation = (calcObj) =>{
        setTotals({
            ...calcObj,
            totalTime: calcObj.total,
            timeFrom: dateHelper.minizeWeekAndMonth(calcObj.timeFrom),
            timeTo: dateHelper.minizeWeekAndMonth(calcObj.timeTo)
        });
    }

    useEffect(async()=>{
        const id = location.pathname.split(':')[2];

        let avilMember;
        if(location.state) avilMember = location.state;
        else avilMember = await mbr.getById(id);

        if(!avilMember.id){
            return;
        }

        setMember(avilMember);
        
        return () =>{
            
        }
    }, []);

    useEffect(()=>{
        if (spreadsheetId) initialize()
    }, [spreadsheetId]);

    useEffect(async()=>{
        if (!member?.id) return;
        const collector = await setting.getSetting(member?.id);
        const uSetting = collector.first();
        setSpreadsheetId(uSetting?.spreadsheetId);
    }, [member]);

    return(
        <Layout title="Report">
            <div className="report-toggle">
                <SiTeamviewer 
                    onClick={()=>setToggleCalendar(!toggleCalendar)}
                    fill={toggleCalendar ? 'dodgerblue' : 'black'}
                />
            </div>
            <div>
                <div className="report-header-container">
                    <h3>Team/Member</h3>
                    <div>Caribbean coding academy grenada</div>
                    <div>Time sheet delails</div>
                    <div style={{visibility: !totals.timeFrom &&'hidden'}}>From {totals.timeFrom} to {totals.timeTo}</div>
                </div>
                <div className="report-billable-devider">
                    <div className="report-billable-options">
                        <MultiSelect title="Sheets" onChange={fetchSheet} options={availableSheets} />
                    </div>
                    <div className="report-billable-centerize">
                        <div>Logged Hours:</div>
                        <div className="report-billable-sub-info">(Includes time spent on 'Fixed Cost' projects)</div>
                        <div className="report-billable-detail">
                            <div className="report-flex">
                                <div className="report-flex-head">Billed Hours</div>
                                <div>{totals.totalTime}</div>
                                <div>$0.00</div>
                            </div>
                            <div className="report-flex">
                                <div className="report-flex-head">Unbilled Hours</div>
                                <div>00:00</div>
                                <div>$0.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="report-billable-options">
                        <Button onClick={()=>setOpenInvoice(true)} title="Invoice" />
                        <div hidden={!toggleCalendar}>
                            <Button onClick={()=>setOpenLogPicker(true)} title="Search" />
                        </div>
                    </div>
                </div>

                <SpreadsheetCalendar 
                    isOpen={!toggleCalendar}
                    sheets={sheets} 
                    onCalculate={calculation} 
                />

                <TimesheetCalendar
                    user={member}
                    isOpen={toggleCalendar}
                    searchBy={searchBy}
                />
            </div>

            <Invoice 
                isOpen={openInvoice} 
                onClose={()=>setOpenInvoice(false)} 
                values={totals}
                logs={logs}
            />

            <LogPicker
                revertTo={searchBy}
                isOpen={openLogPicker}
                onClose={()=>setOpenLogPicker(false)} 
                onChange={(d)=>setSearchBy({month: d.month, year: d.year})}
            />

            <Loading loading={loading} />
        </Layout>
    )
}