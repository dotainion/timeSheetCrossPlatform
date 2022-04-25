import React, { useEffect, useRef } from "react";
import { UserToolbar } from "../components/UserToolbar";


export const UserLayout = ({minimize, onSearch, onMinimize, children}) =>{

    useEffect(()=>{
        
    }, []);
    return(
        <div className="user-layout" style={{backgroundImage: minimize && 'none'}}>
            <div hidden={minimize}>
                <UserToolbar onSearch={onSearch} onMinimize={onMinimize} />
            </div>
            <div className="max-width">
                {children}
            </div>
        </div>
    )
}