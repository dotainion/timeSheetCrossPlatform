import React from "react";
import logo from '../images/logo.png';


export const NestedPageNotFound = () =>{
    return(
        <div>
            <div className="position-absolute start-50 top-50 translate-middle text-center">
                <img className="w-25" src={logo} alt="" />
                <div className="display-1 fw-bold">Welcome</div>
                <div className="display-5">Track Time Accurately</div>
                <div>Jibble's timestamps, facial recognition and geolocation features all ensure accurate clock-ins. No more buddy punching!</div>
            </div>
        </div>
    )
}