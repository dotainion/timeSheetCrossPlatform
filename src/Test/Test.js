import React from "react";
import { LogPicker } from "../components/LogPicker";


export const Test = () =>{
    return(
        <LogPicker 
            isOpen={true}
            onChange={(data)=>console.log(data)}
        />
    )
}