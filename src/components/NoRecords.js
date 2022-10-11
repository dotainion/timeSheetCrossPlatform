import React from "react";
import { Button } from "../widgets/Button";


export const NoRecords = ({image, title, btnName, onClick, messages}) =>{
    return(
        <div className="no-record">
            <div className="no-record-content">
                <h2>{title}</h2>
                {messages?.map((msg, key)=>(
                    <p key={key}>{msg}</p>
                ))}
                <div>
                    <Button onClick={onClick} title={btnName} />
                </div>
            </div>
            <div>
                <img src={image} alt="" />
            </div>
        </div>
    )
}