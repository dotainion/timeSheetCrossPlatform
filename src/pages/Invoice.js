import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../container/Modal";
import { jsPDF } from 'jspdf';
import $ from 'jquery';
import { time } from "../infrastructure/tools/Time";
import { Button } from "../widgets/Button";
import { Calculator } from "../infrastructure/Calculator";
import { useLocation } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { LogRangePicker } from "../components/LogRangePicker";
import { AiOutlinePrinter, AiOutlineDownload } from 'react-icons/ai';


const pdf = new jsPDF({
    orientation: "p",
    unit: 'pt',
    format: 'a4'
});

const calc = new Calculator();

export const Invoice = () =>{
    const [totals, setTotals] = useState({totalHours: 0, total: 0});
    const [invoices, setInvoices] = useState([]);
    const [userInfo, setUserInfo] = useState({name: '', timeFrom: '', timeTo: ''});
    const [openSearch, setOpenSearch] = useState(false);

    const location = useLocation();

    const inputRef = useRef();
    const printedPageRef = useRef();
    const toolbarRef = useRef();
    const invoiceContainerRef = useRef();

    const onPrint = () =>{
        const pri = document.getElementById("iframePrint").contentWindow;
        pri.document.open();
        pri.document.write($(printedPageRef.current).html());
        pri.document.title = 'Time Sheet Invoice';
        $(pri.document).find('input').css({border: 'none'});
        pri.document.close();
        pri.focus();
        pri.print();
    }

    const download = () =>{
        const position = 30;
        const clone = $(printedPageRef.current).clone()[0];
        $(clone).css({
            width: pdf.internal.pageSize.getWidth() - position,
        })
        const pdfCallback = {
            callback: (doc)=> doc.save('fishes.pdf'),
            x: position / 2, y: position / 2,
        };
        pdf.html(clone, pdfCallback);
    }

    const onAddRatePerHour = (e, val=null) =>{
        const [hour, minutes, seconds] = val ? val?.split(':') :  totals.totalHours?.split(':');
        const total = parseFloat(`${hour}.${minutes}`) * parseFloat(e.target.value || 0);
        setTotals({totalHours: totals.totalHours, total: total});
    }

    const initializeSpreadsheet = (spreadsheet) =>{
        if (spreadsheet?.values?.sheets?.length){
            let tempSheets = [];
            spreadsheet.values.sheets.forEach((sheet)=>{
                sheet.forEach((item)=>{
                    if (!spreadsheet.values.exludedIds.includes(item.id) && item.start && item.end){
                        tempSheets.push(item);
                    }
                });
            });
            setInvoices(tempSheets);
            setTotals({totalHours: spreadsheet.values.total, total: totals.total});
        }
    }

    const initializeTimeLog = (logs) =>{
        if (!logs?.length) return;
        let tempSheets = logs?.map((log)=>{
            return { 
                start: log?.startTime, 
                end: log?.endTime, 
                date: (new Date(log?.timestamp)).toDateString() 
            };
        });
        setInvoices(tempSheets);
        setTotals({totalHours: calc.calculateTime(logs), total: totals.total});
    }

    useEffect(()=>{
        if(location.state){
            if(location.state?.spreadsheet){
                initializeSpreadsheet(location.state.spreadsheet);
            }else if(location.state?.timesheet){
                initializeTimeLog(location.state.timesheet);
                setUserInfo(location.state?.info);
            }else{
                console.log('Unable to pull data.')
            }
        }
        $(invoiceContainerRef.current).css({
            height: window.innerHeight - ($(toolbarRef.current).height() -20) + 'px',
        });
    }, []);

    return(
        <div>
            <div ref={toolbarRef} className="invoice-toolbar">
                <Button onClick={onPrint} title={<div>Print<AiOutlinePrinter /></div>} />
                <Button onClick={download} title={<div>Download<AiOutlineDownload /></div>} />
                <Button onClick={()=>setOpenSearch(true)} title={<div>Search...<BiSearchAlt /></div>} />
                
            </div>
            <div ref={invoiceContainerRef} className="invoice-container">
                <div className="invoice">
                    <div ref={printedPageRef} style={printStyles.parent}>
                        <div style={printStyles.editable}>
                            <input style={{...printStyles.input, width: '99%', textAlign:"center"}} />
                        </div>
                        <div style={{...printStyles.invoiceHeader, marginTop: '10px'}}>
                            <div style={printStyles.invoiceHeaderDiv}>
                                <b style={printStyles.invoiceHeaderB}>Consultant:</b>
                                <span>Name - Mr/Ms. {userInfo.name}</span>
                            </div>
                        </div>
                        <div style={{...printStyles.invoiceHeader, marginBottom: '30px'}}>
                            <div style={printStyles.invoiceHeaderDiv}>
                                <b style={printStyles.invoiceHeaderB}>Client:</b>
                                <span>Serial Entrepreneur</span>
                            </div>
                            <div style={printStyles.invoiceHeaderDiv}>
                                <div style={{backgroundColor: printStyles.cColor, padding: '8px', width: '100%', display: 'inline-block'}}>
                                    <b style={printStyles.invoiceHeaderB}>Week Starting: </b>
                                    {userInfo.timeFrom}
                                    <b> To: </b>
                                    {userInfo.timeTo}
                                </div>
                            </div>
                        </div>
                        <div style={printStyles.invoiceRow}>
                            <div style={printStyles.invoiceRowDiv}><b>Date</b></div>
                            <div style={printStyles.invoiceRowDiv}><b>start time</b></div>
                            <div style={printStyles.invoiceRowDiv}><b>end time</b></div>
                            <div style={printStyles.invoiceRowDiv}><b>non-billable</b></div>
                            <div style={printStyles.invoiceRowDiv}><b>Total</b></div>
                        </div>
                        {invoices.map((tm, key)=>(
                            <div style={printStyles.invoiceRow} key={key}>
                                <div style={printStyles.invoiceRowDiv}>{tm?.date}</div>
                                <div style={printStyles.invoiceRowDiv}>{tm?.start}</div>
                                <div style={printStyles.invoiceRowDiv}>{tm?.end}</div>
                                <div style={printStyles.invoiceRowDiv}>00:00:00</div>
                                <div style={printStyles.invoiceRowDiv}>{time.sub(tm?.end, tm?.start)}</div>
                            </div>
                        ))}
                        <div style={printStyles.invoiceTotalCenter}>
                            <div style={{...printStyles.invoiceTotal, marginTop: '20px'}}>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}><b>Total Hours</b></div>
                                <div style={{...printStyles.invoiceTotalDiv, backgroundColor: printStyles.pColor}}><b>{totals?.totalHours}</b></div>
                            </div>
                            <div style={printStyles.invoiceTotal}>
                                <div style={{...printStyles.invoiceTotalDiv, textAlign: 'right'}}>Client Signature:</div>
                                <div style={{...printStyles.invoiceTotalDiv, borderBottom: '1px solid black'}}></div>
                                <div style={printStyles.invoiceTotalDiv}>Rate Per Hour</div>
                                <div style={{...printStyles.invoiceTotalDiv, backgroundColor: printStyles.cColor}}><span>$</span>
                                    <input ref={inputRef} type="number" style={printStyles.input} onKeyUp={onAddRatePerHour} />
                                    <span>USD</span>
                                </div>
                            </div>
                            <div style={printStyles.invoiceTotal}>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}><b>RTotal Pay</b></div>
                                <div style={{...printStyles.invoiceTotalDiv, backgroundColor: printStyles.pColor}}><b>$</b><b>{totals.total?.toFixed(2)}</b></div>
                            </div>
                        </div>
                    </div>
                    <iframe id="iframePrint" style={printStyles.iframe} />
                </div>
            </div>
            <LogRangePicker
                isOpen={openSearch}
                onClose={()=>setOpenSearch(false)}
            />
        </div>
    )
}

const printStyles = {
    parent: {
        fontSize: '12px',
        minHeight: '1056px',
    },
    invoiceRow: {
        width: '100%',
        display: 'flex',
        textAlign: 'center',
    },
    invoiceRowDiv: {
        width: '100%',
        padding: '3px',
        border: '1px solid lightgray',
    },
    invoiceHeader: {
        display: 'flex',
    },
    invoiceHeaderDiv: {
        padding: '5px',
        width: '100%',
    },
    invoiceHeaderB: {
        paddingRight: '10px',
    },
    invoiceTotalCenter: {
        paddingRight: '40px',
    },
    invoiceTotal: {
        width: '100%',
        display: 'flex',
    },
    invoiceTotalDiv: {
        width: '100%',
        padding: '8px',
        marginRight: '10px',
    },
    iframe: {
        height: '0px', 
        width: '0px', 
        position: 'absolute',
    },
    cColor: 'rgb(236, 222, 178)',
    pColor: 'rgb(177, 215, 252)',
    editable: {
        backgroundColor: 'rgb(177, 215, 252)',
        marginTop: '40px',
        textAlign: 'center',
        padding: '8px',
        fontWeight: 'bold',
    }, 
    input: {
        width: '100px',
        outline: 'none',
        backgroundColor: 'transparent',
        border: '1px solid lightgray',
    }
}