import React, { useEffect, useRef, useState } from "react";
import { AiFillClockCircle } from 'react-icons/ai';
import { IoIosMore } from 'react-icons/io';
import $ from 'jquery';
import { StopClock } from "../components/StopClock";
import { GiCoffeeCup } from 'react-icons/gi';
import { ShowInfo } from "../widgets/ShowInfo";
import { GiPin } from 'react-icons/gi';
import { Options } from "../components/Options";



export const ClockIn = () =>{
    const [pin, setPin] = useState(false);
    const [start, setStart] = useState(false);

    const parentRef = useRef();

    const options = [
        {
            title: 'Testing',
        },{
            title: 'Testing',
        },{
            title: 'Testing',
        },
    ]

    useEffect(()=>{

    }, [pin]);
    return(
        <div ref={parentRef} style={{backdropColor: 'red'}}>
            <div className="clock-in">
                <div className="max-width clock-in-user">
                    <div style={{borderBottom: '1px solid rgb(0,0,0,0.2)'}} >User Name</div>
                    <div>
                        <Options parentRef={parentRef} options={options}>
                            <IoIosMore />
                        </Options>
                        <ShowInfo info="Pin">
                            <GiPin 
                                id="pin-switch"
                                onClick={()=>setPin(!pin)} 
                                className="clock-in-pin" 
                                style={{color: pin && 'gray'}}
                            />
                        </ShowInfo>
                        <StopClock startTimer={start} />
                    </div>
                </div>
                <div className="max-width" >
                    <div className="clock-in-btns">
                        <ShowInfo info="Start">
                            <AiFillClockCircle 
                                onClick={()=>setStart(true)} 
                                className="start" 
                                style={{backgroundColor: start === true && 'lightgray'}}
                            />
                        </ShowInfo>
                        <ShowInfo info="Pause">
                            <GiCoffeeCup 
                                onClick={()=>start === true && setStart('pause')} 
                                className="break" 
                                style={{backgroundColor: start === 'pause' && 'lightgray'}}
                            />
                        </ShowInfo>
                        <ShowInfo info="Stop">
                            <AiFillClockCircle 
                                onClick={()=>setStart(false)} 
                                className="end" 
                                style={{backgroundColor: start === false && 'lightgray'}}
                            />
                        </ShowInfo>
                    </div>
                </div>
            </div>
        </div>
    )
}