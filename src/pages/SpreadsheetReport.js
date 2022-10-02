import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Invoice } from "../module/logic/Invoice";
import { routes } from "../Routes/Routes";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';


const mbr = new Users();
const api = new Spreadsheet();
const invoice = new Invoice();

export const SpreadsheetReport = () =>{
    const { user } = useAuth();

    const [member, setMember] = useState();
    const [sheets, setSheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({total: '', logs: ''});

    const location = useLocation();
    const navigate = useNavigate()

    const navigateToInvoice = () =>{
        if(!details.logs || !details.logs.length) return;
        const state = {
            logs: invoice.timeClock(details.logs),
            info: {
                name: member?.firstName + ' ' + member?.lastName,
                timeFrom: (new Date(details.logs[0].timestamp)).toLocaleDateString(),
                timeTo: (new Date(details.logs[details.logs.length -1].timestamp)).toLocaleDateString()
            }
        }
        navigate(routes.nested().invoice+':'+member?.id, {state: state});
    }
    

    const fetchSpreadsheet = async(spreadsheetId) =>{
        setLoading(true);
        const calc = new Calculator();
        const spreadsheet = await api.getSpreadsheet(spreadsheetId);
        if(spreadsheet.error) return setLoading(false);
        const titles = spreadsheet.data[0].sheets.map((sheet)=>sheet.properties.title);
        const dataSheet = await api.getSheet(titles, spreadsheetId);
        if (dataSheet?.error || !dataSheet?.data) return setLoading(false);
        dataSheet.data.forEach((sheet)=>calc.add(sheet.values));
        setSheets(calc.spreadsheetCollection());
        setLoading(false);
    }

    useEffect(async()=>{
        const urlList = location.pathname.split(':');
        const spreadsheetId = urlList[urlList.length -1].replace('*', '').split('/')[0];
        const memberId = urlList[urlList.length -3].replace('/', '').replace('*', '');
        let avilMember = await mbr.getById(memberId);
        setMember(avilMember);
        fetchSpreadsheet(spreadsheetId);
    }, []);

    return(
        <LayoutPageHandler title="Report" menu={[{title: 'Invoice', onClick: ()=>navigateToInvoice()}]}>
            <div>
                <div className="mt-3">
                    <div>Caribbean coding academy grenada</div>
                    <div>Time sheet delails</div>
                </div>
                <div className="border p-3">
                    <div>Logged Hours:</div>
                    <div className="report-billable-sub-info">(Includes time spent on 'Fixed Cost' projects)</div>
                    <div className="report-billable-detail">
                        <div className="report-flex">
                            <div className="report-flex-head">Billed Hours</div>
                            <div>{details.total || '00:00:00'}</div>
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
                    onCalculate={setDetails} 
                />
            </div>
            <Loading loading={loading} />
        </LayoutPageHandler>
    )
}