import React, { useEffect, useState } from "react";
import { LogRangePicker } from "../components/LogRangePicker";
import { DateHelper } from "../infrastructure/DateHelper";
import { useAuth } from "../provider/AuthenticationWrapper";
import { db } from "../infrastructure/config/AuthConfig";
import { TimeHandler } from "../infrastructure/tools/TimeHandler";

const date = new DateHelper();
const time = new TimeHandler();

export const Test = () =>{
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const run = () =>{
        const instance = new TimeHandler().sub(1666495843913, new Date().getTime());
        const instance2 = new TimeHandler().sub(1666495843913, new Date().getTime());
        console.log(instance.toString());
        console.log(instance2.toString());
        console.log(new TimeHandler().add(instance, instance2));
    }

    useEffect(()=>{
       
    }, []);
    
    return(
        <div className="position-absolute start-50 top-50 translate-middle">
            <div onClick={run} className="btn btn-primary">Click Me</div>
        </div>
    )
}