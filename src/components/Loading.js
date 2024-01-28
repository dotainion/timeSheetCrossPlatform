import React from "react";


export const Loading = ({loading}) =>{
    return(
        <div hidden={!loading} className="position-absolute start-50 top-50 translate-middle bg-danger" style={{zIndex: 9999999}}>
            <div className="spin position-relative rounded-circle d-inline-block" style={{transform: 'translateX(-50%)'}}>
                <div className="move-hv-top-left position-absolute bg-success rounded-circle p-1 top-0 start-0"></div>
                <div className="move-hv-top-right position-absolute bg-danger rounded-circle p-1 top-0 end-0"></div>
                <div className="move-hv-bottom-left position-absolute bg-warning rounded-circle p-1 bottom-0 start-0"></div>
                <div className="move-hv-bottom-right position-absolute bg-primary rounded-circle p-1 bottom-0 end-0"></div>
            </div>
        </div>
    )
}