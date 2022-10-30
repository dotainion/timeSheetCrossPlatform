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
import { PunchInTime } from "../../clock/PunchInTime";


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

    const [hidden, setHidden] = useState();

    useEffect(()=>{
    }, []);
    
    return(
        <UserLayout hidden={hidden}>
            <PunchInTime onMinimize={setHidden} />
        </UserLayout>
    )
}