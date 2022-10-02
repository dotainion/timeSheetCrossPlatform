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
import { Layout } from "../layout/Layout";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';


const pdf = new jsPDF({
    orientation: "p",
    unit: 'pt',
    format: 'a4'
});

const calc = new Calculator();

export const Invoice = () =>{
    const [totals, setTotals] = useState({hours: 0, total: 0});
    const [invoices, setInvoices] = useState([]);
    const [userInfo, setUserInfo] = useState({name: '', timeFrom: '', timeTo: ''});

    const location = useLocation();

    const inputRef = useRef();
    const printedPageRef = useRef();

    const menu = [
        {title: <>Print<AiOutlinePrinter className="fs-5 ms-2" /></>, onClick: ()=>onPrint()},
        {title: <>Download<AiOutlineDownload className="fs-5 ms-2" /></>, onClick: ()=>download()},
    ];

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
        if(!totals.hours) return;
        const [hour, minutes, seconds] = val ? val?.split(':') :  totals.hours?.split(':');
        const total = parseFloat(`${hour}.${minutes}`) * parseFloat(e.target.value || 0);
        setTotals({hours: totals.hours, total: total});
    }

    const calculate = (logs) =>{
        if (!logs?.length) return;
        setTotals({hours: calc.calculateTime(logs), total: totals.total});
    }

    useEffect(()=>{
        if(!location.state) return;
        setInvoices(location.state.logs.collected);
        setUserInfo(location.state.info);
        calculate(location.state.logs.collected);
    }, []);

    return(
        <LayoutPageHandler menu={menu}>
            <div className="invoice-container">
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
                                <span>{'Client name'}</span>
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
                                <div style={printStyles.invoiceRowDiv}>{tm?.startTime}</div>
                                <div style={printStyles.invoiceRowDiv}>{tm?.endTime}</div>
                                <div style={printStyles.invoiceRowDiv}>00:00:00</div>
                                <div style={printStyles.invoiceRowDiv}>{time.sub(tm?.endTime, tm?.startTime)}</div>
                            </div>
                        ))}
                        <div style={printStyles.invoiceTotalCenter}>
                            <div style={{...printStyles.invoiceTotal, marginTop: '20px'}}>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}></div>
                                <div style={printStyles.invoiceTotalDiv}><b>Total Hours</b></div>
                                <div style={{...printStyles.invoiceTotalDiv, backgroundColor: printStyles.pColor}}><b>{totals?.hours}</b></div>
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
        </LayoutPageHandler>
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