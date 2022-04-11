import React from "react";


export const Loading = ({loading}) =>{
    return(
        <div hidden={!loading} className="loading-container">
            <div>
                <span/>
            </div>
        </div>
    )
}