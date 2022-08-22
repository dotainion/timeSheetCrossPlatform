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
//import { Invoice } from "../components/Invoice";
import { Loading } from "../components/Loading";
import { Calculator } from "../infrastructure/Calculator";
import { UserSetting } from "../module/logic/UserSetting";
import { useAuth } from "../provider/AuthenticationWrapper";
import { TimesheetCalendar } from "../components/TimesheetCalendar";
import { SiTeamviewer } from 'react-icons/si';
import { LogRangePicker } from "../components/LogRangePicker";
import { QueryDate } from "../module/objects/QueryDate";


const mbr = new Users();
const api = new Spreadsheet();
const dateHelper = new DateHelper();
const setting = new UserSetting();
const dateObject = new QueryDate();
dateObject.initNowDate();

export const SpreadsheetReport = () =>{
    const { user } = useAuth();

    const [searchBy, setSearchBy] = useState(dateObject);
    const [openLogPicker, setOpenLogPicker] = useState(false);
    const [sheets, setSheets] = useState([]);
    const [member, setMember] = useState();
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({
        totalTime: 0, 
        timeFrom: '', 
        timeTo: ''
    });

    const location = useLocation();

    const fetchSheet = async(title, sheetId, spreadsheetId) =>{
        setLoading(true);
        const sheet = await api.getSheet(title, spreadsheetId);
        if (sheet?.error || !sheet) return setLoading(false);

        const calc = new Calculator();
        calc.setExtra('title', title);
        calc.setExtra('sheetId', sheetId);
        const record = {values: sheet.data.data.values};
        const calulated = calc.fromSpreadsheet(record);
        setSheets(calulated);
        setLoading(false);
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
        if(!avilMember.id) return;
        setMember(avilMember);
        return () =>{}
    }, []);

    useEffect(async()=>{
        if (!member?.id) return;
        const urlList = location.pathname.split(':');
        const title = urlList[urlList.length -1];
        const sheetId = urlList[urlList.length -3];
        const spreadsheetId = urlList[urlList.length -5];
        const memberId = urlList[urlList.length -7];
        fetchSheet(title.split('/')?.[0], sheetId, spreadsheetId);
    }, [member]);

    return(
        <Layout title="Report" menu={[{title: 'Search', onClick: ()=> setOpenLogPicker(true)}]}>
            <div>
                <div className="">
                    <h3>Team/Member</h3>
                    <div>Caribbean coding academy grenada</div>
                    <div>Time sheet delails</div>
                    <div style={{visibility: !totals.timeFrom &&'hidden'}}>From {totals.timeFrom} to {totals.timeTo}</div>
                </div>
                <div className="border p-3">
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
                <SpreadsheetCalendar 
                    isOpen={true}
                    sheets={sheets} 
                    onCalculate={calculation} 
                />
            </div>

            <LogRangePicker
                isOpen={openLogPicker}
                onClose={()=>setOpenLogPicker(false)} 
                onSelected={setSearchBy}
            />

            <Loading loading={loading} />
        </Layout>
    )
}