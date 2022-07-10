import React from "react";


export const ButtonCardMemberBody = ({role, team, onClick}) =>{
    return(
        <div className="position-relative">
            <div className="d-flex w-100 border-top p-2">
                <div className="w-100 border-end overflow-hidden">
                    <div className="small p-0 m-0 text-muted pt-1">Role</div>
                    <div className="w-100 me-2 ms-2 fw-bold text-dark text-nowrap text-truncate">{role}</div>
                </div>
                <div className="w-100 ms-1 overflow-hidden">
                    <div className="small p-0 m-0 text-muted pt-1">Team</div>
                    <div className="w-100 me-2 ms-2 fw-bold text-dark text-nowrap text-truncate">{team}</div>
                </div>
            </div>
            <div onClick={(e)=>{
                e.stopPropagation();
                onClick?.();
            }} className="btn btn-secondary pt-0 pb-0">Timesheet/Reports</div>
        </div>
    )
}