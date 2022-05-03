import React, { useEffect, useRef, useState } from "react";
import { AiFillClockCircle } from 'react-icons/ai';
import { IoIosMore } from 'react-icons/io';
import $ from 'jquery';
import { StopClock } from "../../components/StopClock";
import { GiCoffeeCup } from 'react-icons/gi';
import { ShowInfo } from "../../widgets/ShowInfo";
import { GiPin } from 'react-icons/gi';
import { Options } from "../../components/Options";
import { SpreadsheetCalendar } from "../../components/SpreadsheetCalendar";
import { TimesheetCalendar } from "../../components/TimesheetCalendar";
import { Log } from "../../module/logic/Log";
import { useAuth } from "../../provider/AuthenticationWrapper";
import { time } from "../../infrastructure/tools/Time";
import { Break } from "../../module/logic/Beak";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { DayCard } from "../../components/DayCard";
import { TimeXBreakOption } from "../../components/TimeXBreakOption";
import { DateHelper } from "../../infrastructure/DateHelper";
import { Input } from "../../widgets/Input";
import { FiMinimize, FiMaximize } from 'react-icons/fi';
import { UserLayout } from "../layout/UserLayout";
import { LogPicker } from "../../components/LogPicker";


const log = new Log();
const breaks = new Break();
const toast = new ToastHandler();
const dHelper = new DateHelper();
const d = new Date();

export const ClockIn = () =>{
    const { user } = useAuth();

    const [minimize, setMinimize] = useState(false);
    const [pin, setPin] = useState(false);
    const [timeLog, setTimeLog] = useState();
    const [onPause, setOnPause] = useState();
    const [loading, setLoading] = useState(false);
    const [openLogPicker, setOpenLogPicker] = useState(false);
    const [start, setStart] = useState({state: false, at: null});
    const [searchBy, setSearchBy] = useState({month: dHelper.monthMini(d.getMonth()), year: `${d.getFullYear()}`});
    const [searchOption, setSearchOption] = useState({month: null, year: null});
    const [timeXBreakLog, setTimeXBreakLog] = useState({state: false, log: null, breaks: null});

    const parentRef = useRef();

    const options = [
        {
            title: 'Maximize',
            action: ()=> setMinimize(false),
        }
    ];

    const startTimer = async(at=null) =>{
        if (start.state && !loading && !onPause){
            return toast.warning(`Time already started at ${timeLog?.startTime || ''}`);
        }
        setLoading(true);
        if (!onPause){
            setStart({state: true, at: at});
            const collector = await log.startTime(user?.id);
            setTimeLog(collector.first());
        }else{
            setOnPause(null);
            const collector2 = await breaks.endBreak(timeLog?.id);
        }
        setLoading(false);
    }

    const endTimer = async() =>{
        setLoading(true);
        const collector = await breaks.getPendingBreak(timeLog?.id);
        if (collector.hasItems()){
            return toast.warning('Please end break first, then try again.');
        }
        if (!onPause){
            setStart({state: false, at: null});
            await log.endTime(user?.id);
        }
        setLoading(false);
    }

    const startBreak = async() =>{
        setLoading(true);
        if (onPause == 'Pause'){
            setOnPause(null);
            const collector = await breaks.endBreak(timeLog?.id);
            return setLoading(false);;
        }
        if (start.state === true){
            breaks.startBreak(timeLog?.id, user?.id);
            setOnPause('Pause');
        }else{
            toast.warning('Only allow during the start of a task.');
        }
        setLoading(false);
    }

    const initTime = async() =>{
        const timeCollector = await log.getPendingLog(user?.id);
        if (timeCollector.hasItems()){
            const newTime = new Date().toLocaleTimeString();
            const startTime = time.sub(newTime, timeCollector.first().startTime);
            setStart({state: true, at: startTime});
            setTimeLog(timeCollector.first());
        }
    }

    const initBreak = async() =>{
        const breakCollector = await breaks.getPendingBreak(timeLog?.id);
        if (breakCollector.hasItems()){
            setOnPause('Pause');
        }
    }
    useEffect(()=>{
        const date = new Date();
        date.setFullYear(date.getFullYear() - 6);
        const getYear = [...Array(7).keys()].map((y)=>{
           return { title: date.getFullYear() +y }
        });
        let calendarOption = [];
        for (let i=0; i<dHelper.month().length; i++){
            calendarOption.push({
                title: dHelper.month(i), 
                value: dHelper.monthMini(i)
            });
        }
        setSearchOption({month: calendarOption, year: getYear});
    }, []);


    useEffect(()=>{
        if (!loading){
            initTime();
            initBreak();
        }
    }, [timeLog]);

    useEffect(()=>{
        
    }, [pin]);

    useEffect(()=>{
        
    }, [start]);
    return(
        <UserLayout onSearch={()=>setOpenLogPicker(true)} onMinimize={()=>setMinimize(true)} minimize={minimize} >
            <div ref={parentRef} className="click-in-container" style={{paddingTop: !minimize && '40px'}}>
                <div className="clock-in" style={{width: minimize && '360px'}}>
                    <div className="max-width clock-in-user">
                        <div style={{borderBottom: '1px solid rgb(0,0,0,0.2)'}} >User Name</div>
                        <div>
                            <Options parentRef={parentRef} options={options}>
                                <IoIosMore />
                            </Options>
                            <ShowInfo info="Pin">
                                <GiPin 
                                    id="pin-switch"
                                    onClick={()=>setPin(!pin)} 
                                    className="clock-in-pin" 
                                    style={{color: pin && 'gray'}}
                                />
                            </ShowInfo>
                            <ShowInfo>
                                <FiMaximize
                                    style={{display: !minimize && 'none', marginRight: '10px',fontSize: '14px'}}
                                    onClick={()=>setMinimize(false)}
                                />
                            </ShowInfo>
                            <StopClock 
                                startTimer={start.state} 
                                startAt={start.at} 
                                displayOverride={onPause}
                            />
                        </div>
                    </div>
                    <div className="max-width" >
                        <div className="clock-in-btns">
                            <ShowInfo info="Start">
                                <div className="clock-in-btn-dots" style={{backgroundColor: 'green'}}/>
                                <AiFillClockCircle 
                                    onClick={startTimer} 
                                    className="start" 
                                    style={{backgroundColor: start.state === true && 'rgb(255, 255, 255, 0.8)'}}
                                />
                            </ShowInfo>
                            <ShowInfo info="Pause">
                                <div className="clock-in-btn-dots" style={{backgroundColor: 'orange'}}/>
                                <GiCoffeeCup 
                                    onClick={startBreak} 
                                    className="break" 
                                    style={{backgroundColor: onPause && 'rgb(255, 255, 255, 0.8)'}}
                                />
                            </ShowInfo>
                            <ShowInfo info="Stop">
                                <div className="clock-in-btn-dots" style={{backgroundColor: 'red'}}/>
                                <AiFillClockCircle 
                                    onClick={endTimer} 
                                    className="end" 
                                    style={{backgroundColor: start.state === false && 'rgb(255, 255, 255, 0.8)'}}
                                />
                            </ShowInfo>
                        </div>
                    </div>
                </div>
                <div hidden={minimize}>
                    <div className="clock-in-calendar-header">
                        <h2>Timesheet Application</h2>
                    </div>
                    <div className="clock-in-calendar-container" style={{backgroundColor: minimize && 'white'}}>
                        <TimesheetCalendar 
                            isOpen={true} 
                            fullMonth={false}
                            searchBy={searchBy}
                            onShowMore={(data)=>{setTimeXBreakLog({state: true, log: data?.log, breaks: data?.breaks})}} 
                        />
                    </div>
                    <TimeXBreakOption 
                        isOpen={timeXBreakLog.state} 
                        log={timeXBreakLog.log} 
                        breaks={timeXBreakLog.breaks} 
                        onClose={()=>setTimeXBreakLog({state: false, log: null, breaks: null})}
                    />
                </div>
            </div>
            <LogPicker
                month={searchBy.month}
                year={searchBy.year}
                isOpen={openLogPicker} 
                onClose={()=>setOpenLogPicker(false)}
                onChange={(d)=>setSearchBy({month: d.month, year: d.year})}
            />
        </UserLayout>
    )
}