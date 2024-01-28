import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { Users } from "../module/logic/Users";
import { DateHelper } from "../infrastructure/DateHelper";
import $ from 'jquery';
import { UserSetting } from "../module/logic/UserSetting";
import { useAuth } from "../provider/AuthenticationWrapper";
import { TimesheetCalendar } from "../components/TimesheetCalendar";
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { LogRangePicker } from "../components/LogRangePicker";
import { QueryDate } from "../module/objects/QueryDate";
import { BiSearchAlt } from 'react-icons/bi';
import { routes } from "../Routes/Routes";
import { Invoice } from "../module/logic/Invoice";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';


const mbr = new Users();
const invoice = new Invoice();
const dateObject = new QueryDate();
dateObject.initNowDate();

export const Report = () =>{
    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [searchBy, setSearchBy] = useState(dateObject);
    const [openLogPicker, setOpenLogPicker] = useState(false);
    const [member, setMember] = useState();
    const [total, setTotal] = useState('');

    const location = useLocation();
    const navigate = useNavigate()

    const navigateToInvoice = () =>{
        if(!logs || !logs.length) return;
        const state = {
            logs: invoice.timeClock(logs),
            info: {
                name: member?.firstName + ' ' + member?.lastName,
                timeFrom: (new Date(searchBy.from)).toLocaleDateString(),
                timeTo: (new Date(searchBy.to)).toLocaleDateString()
            }
        }
        navigate(routes.nested().invoice()+':'+member?.id, {state: state});
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

    return(
        <LayoutPageHandler title="Report" menu={[
            {title: 'Invoice', onClick: ()=>navigateToInvoice()}, 
            {title: 'Search..', onClick: ()=>setOpenLogPicker(true), tooltip: `From: ${(new Date(searchBy.fromInt)).toDateString()} to: ${(new Date(searchBy.toInt)).toDateString()}`}
        ]}>
            <div className="mt-3 px-2">
                <div className="hide-on-mobile">Caribbean coding academy grenada</div>
                <div className="report-billable-devider">
                    <div className="report-billable-centerize">
                        <div>Logged Hours:</div>
                        <div className="report-billable-sub-info">(Includes time spent on 'Fixed Cost' projects)</div>
                        <div className="report-billable-detail">
                            <div className="report-flex">
                                <div className="report-flex-head">Billed Hours</div>
                                <div>{total || '0:00'}</div>
                                <div>$0.00</div>
                            </div>
                            <div className="report-flex">
                                <div className="report-flex-head">Unbilled Hours</div>
                                <div>00:00</div>
                                <div>$0.00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <TimesheetCalendar
                    isOpen={true}
                    user={member}
                    searchBy={searchBy}
                    fullMonth={true}
                    onCalc={(data)=>{
                        setTotal(data.total);
                        setLogs(data.logs);
                    }}
                />
            </div>

            <LogRangePicker
                isOpen={openLogPicker}
                onClose={()=>setOpenLogPicker(false)} 
                onSelected={setSearchBy}
            />
        </LayoutPageHandler>
    )
}