import React, { useEffect } from "react";
import { LogRangePicker } from "../components/LogRangePicker";
import { LogPicker } from "../components/LogPicker";
import { DateHelper } from "../infrastructure/DateHelper";
import { LogAndBreakRange } from "../module/logic/LogAndBreakRange";
import { useAuth } from "../provider/AuthenticationWrapper";

const log = new LogAndBreakRange();
const date = new DateHelper();

export const Test = () =>{
    const { user } = useAuth();
    
    return(
        <div>
            <h1>Test</h1>
            <LogRangePicker/>
        </div>
    )
}