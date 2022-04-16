import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const PercentageCard = ({title, data, percentage, color}) =>{
    
    useEffect(()=>{
        
    }, []);
    return(
        <div className="percentage-container">
            <div className="percentage-card" style={{backgroundColor: color}}>
                <div>
                    <label>{data}</label>
                    <label>{title}</label>
                </div>
            </div>
            <CircularProgressbar 
                minValue={0} 
                maxValue={100} 
                value={percentage} 
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