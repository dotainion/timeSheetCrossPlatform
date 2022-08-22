import React from "react";


export const FileCard = ({onClick, google, sheet, date, title}) =>{
    return(
        <div onClick={onClick} className="filez d-inline-block mt-3 me-2 pointer text-nowrap">
            <div className={`card rouded file h-scale ${sheet && 'file-bg' || google && 'file-bg2' || ''}`}>
                <div className="card-header">{google && 'Google Sheet' || sheet && 'Sheet'}</div>
                <div className="card-body">
                    <h6 className="card-title text-truncate">{title}</h6>
                    <div>{date}</div>
                </div>
            </div>
        </div>
    )
}