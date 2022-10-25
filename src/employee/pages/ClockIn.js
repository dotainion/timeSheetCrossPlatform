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
import logo from '../../images/logo.png';
import { Loading } from "../../components/Loading";
import { useProvider } from "../../provider/ProviderWrapper";
import { LogRangePicker } from "../../components/LogRangePicker";
import { QueryDate } from "../../module/objects/QueryDate";
import { FaBullseye } from "react-icons/fa";
import { ClockButton } from "../../widgets/ClockButton";


const log = new Log();
const breaks = new Break();
const toast = new ToastHandler();
const dateObject = new QueryDate();
dateObject.initNowDate();

const contents = {
    start: 'Clock In',
    break: 'Pause',
    unBreak: 'Resume',
    end: 'Clock Out'
}

export const ClockIn = () =>{
    const { user } = useAuth();
    const { userTeam } = useProvider();

    const [total, setTotal] = useState();
    const [minimize, setMinimize] = useState(false);
    const [pin, setPin] = useState(false);
    const [timeLog, setTimeLog] = useState();
    const [loading, setLoading] = useState(false);
    const [openLogPicker, setOpenLogPicker] = useState(false);
    const [start, setStart] = useState({state: false, at: null});
    const [searchBy, setSearchBy] = useState(dateObject);
    const [currentState, setCurrentState] = useState(contents.end);

    const parentRef = useRef();

    const options = [
        {
            title: 'Maximize',
            action: ()=> setMinimize(false),
        }
    ];

    const startTimer = async(at=null) =>{
        setLoading(true);
        const collector = await log.startTime(user?.id);
        setTimeLog(collector.first());
        setStart({state: true, at: at});
        if(currentState?.includes(contents.break)){
            setCurrentState([contents.start, contents.break, contents.unBreak]);
            return setLoading(false);
        }
        setCurrentState(contents.start);
        setLoading(false);
    }

    const endTimer = async() =>{
        setLoading(true);
        const collector = await breaks.getPendingBreak(timeLog?.id);
        if (collector.hasItems()){
            toast.warning('Please end break first, then try again.');
            return setLoading(false);
        }
        setTimeLog(null);
        setCurrentState(contents.end);
        await log.endTime(user?.id);
        setStart({state: false, at: null});
        setLoading(false);
    }

    const startBreak = async() =>{
        if(!timeLog?.id) return;
        setLoading(true);
        const bLog = await breaks.startBreak(timeLog?.id, user?.id);
        if(bLog.hasItems()){
            setCurrentState(contents.start);
            await breaks.endBreak(timeLog?.id);
            return setLoading(false);
        }
        setCurrentState([contents.start, contents.break, contents.unBreak]);
        setLoading(false);
    }

    const initTime = async() =>{
        const timeCollector = await log.getPendingLog(user?.id);
        if (timeCollector.hasItems()){
            const newTime = new Date().getTime();
            const startTime = time.advance.sub(timeCollector.first().timestamp, newTime);
            setTimeLog(timeCollector.first());
            setStart({state: true, at: startTime.toString()});
            setCurrentState(contents.start);
            setLoading(false);
            return timeCollector.first();
        }
        return null;
    }

    const initBreak = async(logId) =>{
        const breakCollector = await breaks.getPendingBreak(logId);
        if (breakCollector.hasItems()){
            setCurrentState([contents.start, contents.break, contents.unBreak]);
        }
    }

    useEffect(async()=>{
        if(!user?.id) return;
        const log = await initTime();
        await initBreak(log?.id);
    }, [user]);

    useEffect(()=>{
        //console.log(searchBy);
    }, [searchBy]);
    
    return(
        <UserLayout onSearch={()=>setOpenLogPicker(true)} onMinimize={()=>setMinimize(true)} minimize={minimize} >
            <div ref={parentRef} className="clock-in-container">
                <div className="d-inline-block float-end me-5 mt-4 mb-3 pe-5">
                    <div className="d-flex align-items-center">
                        <div className="me-2">{userTeam?.name}</div>
                        <img src={logo} style={{width: '40px', height: '40px'}} draggable={false} alt="" />
                    </div>
                </div>
                <div className="clock-in bg-dark" style={{width: minimize && '360px', overflow: loading && 'hidden'}}>
                    <div className="max-width clock-in-user">
                        <div style={{borderBottom: '1px solid rgb(0,0,0,0.2)'}} >
                            <label>{user?.firstName}</label>
                            <label>&nbsp;</label>
                            <label>{user?.lastName}</label></div>
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
                                displayOverride={''}
                            />
                        </div>
                    </div>
                    <div className="max-width" >
                        <div className="clock-in-btns text-nowrap">
                            <ClockButton onClick={startTimer} title={contents.start} color="green" tooltip="Start" disabled={loading} state={currentState} />
                            <ClockButton onClick={startBreak} title={currentState?.includes(contents.break)?contents.unBreak:contents.break} color="orange" tooltip="Pause" disabled={loading} state={currentState} />
                            <ClockButton onClick={endTimer} title={contents.end} color="red" tooltip="Stop" disabled={loading} state={currentState} />
                        </div>
                    </div>
                    <Loading loading={loading} />
                </div>
                <div hidden={minimize}>
                    <div className="text-center shadow-sm my-3 p-2 border-top">
                        <div className="display-6 fw-bold">Timesheet Application</div>
                        <div>Total: <b>{total}</b></div>
                    </div>
                    <div className="clock-in-calendar-container" style={{backgroundColor: minimize && 'white'}}>
                        <TimesheetCalendar 
                            user={user}
                            isOpen={true} 
                            fullMonth={true}
                            searchBy={searchBy}
                            onCalc={(data)=>setTotal(data.total)}
                        />
                    </div>
                </div>
            </div>
            <LogRangePicker
                isOpen={openLogPicker} 
                onClose={()=>setOpenLogPicker(false)}
                onSelected={setSearchBy}
            />
        </UserLayout>
    )
}