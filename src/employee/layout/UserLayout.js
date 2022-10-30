import React, { useEffect, useRef } from "react";
import { UserToolbar } from "../components/UserToolbar";


export const UserLayout = ({hidden, children}) =>{

    useEffect(()=>{
        
    }, []);
    return(
        <div className="user-layout" style={{backgroundImage: hidden && 'none'}}>
            <div hidden={hidden}>
                <UserToolbar />
            </div>
            <div className="max-width">
                {children}
            </div>
        </div>
    )
}