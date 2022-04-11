import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../container/Modal";
import { Button } from "./Button";
import { Switch } from "./Switch";
import $ from 'jquery';



export const ConfirmXl = ({isOpen, onSwitch, onClose, onConfirm, title, switchMsg, switchOnMsg, message}) =>{
    const warningRef = useRef();

    const onConfirmed = () =>{
        onConfirm?.();
        onClose?.();
    }

    const onWarning = (state) =>{
        state 
            ? $(warningRef.current).show('fast') 
            : $(warningRef.current).hide('fast');
        onSwitch?.(state);
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="confirm-container">
                <h2>{title}</h2>
                <h4 hidden={switchMsg || switchOnMsg ? false : true}>
                    <span>{switchMsg} </span>
                    <Switch onChange={onWarning} />
                    <p ref={warningRef} hidden>{switchOnMsg}</p>
                </h4>
                <p>{message}</p>
                <div className="confirm-btn-container">
                    <Button onClick={onClose} title="Cancel" />
                    <Button onClick={onConfirmed} title="Confirm delete" style={{color: 'red'}} />
                </div>
            </div>
        </Modal>
    )
}