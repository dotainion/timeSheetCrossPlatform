import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReportCalendar } from "../components/ReportCalendar";
import { Layout } from "../layout/Layout";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { Users } from "../module/logic/Users";
import { Input } from "../widgets/Input";
import { MultiSelect } from "../widgets/MultiSelect";
import { DateHelper } from "../infrastructure/DateHelper";
import $ from 'jquery';
import { Button } from "../widgets/Button";
import { Invoice } from "../components/Invoice";
import { Loading } from "../components/Loading";
import { Calculator } from "../infrastructure/Calculator";


const mbr = new Users();
const api = new Spreadsheet();
const dateHelper = new DateHelper();
const spreadsheetId = '1oHdNqPtzJNs-gLmI6Dzz62c3qoYrpHFBnYp0w_Ov0vw';

let sheetCollector = [];
export const Report = () =>{
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

    const location = useLocation();
    const containerRef = useRef();

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

        if(!avilMember._id){
            return;
        }

        setMember(avilMember);
        
        return () =>{
            
        }
    }, []);

    useEffect(()=>{
        initialize();
    }, []);

    return(
        <Layout title="Report">
            <div ref={containerRef}>
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
                    </div>
                </div>
                <ReportCalendar 
                    sheets={sheets} 
                    onCalculate={calculation} 
                />
            </div>

            <Invoice 
                isOpen={openInvoice} 
                onClose={()=>setOpenInvoice(false)} 
                values={totals}
            />

            <Loading loading={loading} />
        </Layout>
    )
}