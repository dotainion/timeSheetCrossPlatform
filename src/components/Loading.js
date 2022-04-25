import React from "react";


export const Loading = ({loading, relative}) =>{
    return(
        <div 
            hidden={!loading} 
            className="loading-container" 
            style={relative ? {width: '100%', height: '100%'} : {}}
            >
            <div>
                <span/>
            </div>
        </div>
    )
}