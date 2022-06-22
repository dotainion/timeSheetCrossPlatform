import React, { useEffect, useState } from "react";
import { LogRangePicker } from "../components/LogRangePicker";
import { DateHelper } from "../infrastructure/DateHelper";
import { useAuth } from "../provider/AuthenticationWrapper";
import { db } from "../infrastructure/config/AuthConfig";

const date = new DateHelper();

export const Test = () =>{
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const getTest = async(obj) =>{
        const p = db.collection('logs')
            .where('timestamp', '>=', new Date().getTime())
            .where('timestamp', '<=', new Date().getTime())
            .where('userId', '==', '4taOsrs4WaUy3UMaVWJ7cXnUFnD3');
        const data = await p.get();
        data.forEach((d)=>console.log(d.data()));
        console.log('done...');
    };

    useEffect(()=>{
        const date = new Date();
        date.setMonth(0);
        console.log(date.getTime())
    }, []);
    
    return(
        <div>
            <h1>Test<button onClick={getTest}>Search...</button></h1>
            <LogRangePicker
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
                onSelected={getTest}
            />
        </div>
    )
}