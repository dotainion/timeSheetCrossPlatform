import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const PercentageCard = ({title, data, percentage, color}) =>{
    
    useEffect(()=>{
        
    }, []);
    return(
        <div className="percentage-container">
            <div className="card p-1 mb-3 text-light" style={{backgroundColor: color}}>
                <h6 className="p-0 m-0">{data}</h6>
                <div>{title}</div>
            </div>
            <CircularProgressbar 
                minValue={0} 
                maxValue={100} 
                value={percentage || 0} 
                text={`${percentage || 0}%`} 
                styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'butt',
                    textSize: '15px',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    textColor: 'dodgerblue',
                    trailColor: 'white',
                })}
            />
        </div>
    )
}