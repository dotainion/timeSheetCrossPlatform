import React, { useEffect, useState } from "react";
import { LogRangePicker } from "../components/LogRangePicker";
import { DateHelper } from "../infrastructure/DateHelper";
import { useAuth } from "../provider/AuthenticationWrapper";
import { db } from "../infrastructure/config/AuthConfig";

const date = new DateHelper();

export const Test = () =>{
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        
    }, []);
    
    return(
        <div className="position-absolute start-50 top-50 translate-middle">
            <div className="spin position-relative rounded-circle p-3 d-inline-block" style={{marginLeft: '100px'}}>
                <div className="move-hv-top-left position-absolute bg-success rounded-circle p-1 top-0 start-0"></div>
                <div className="move-hv-top-right position-absolute bg-danger rounded-circle p-1 top-0 end-0"></div>
                <div className="move-hv-bottom-left position-absolute bg-warning rounded-circle p-1 bottom-0 start-0"></div>
                <div className="move-hv-bottom-right position-absolute bg-primary rounded-circle p-1 bottom-0 end-0"></div>
            </div>
        </div>
    )
}