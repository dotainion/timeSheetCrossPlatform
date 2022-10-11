import React, { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from "../widgets/Button";
import { CgProfile } from 'react-icons/cg';
import $ from 'jquery';
import { ImgButton } from "../widgets/ImgButton";



export const ModalXl = ({isOpen, onClose, onConfirm, onImageSelect, title, message, children}) =>{
    return(
        <Modal isOpen={isOpen} title="New Team">
            <div className="modal-xl-wrapper">
                <h2>
                    <span>{title}</span>
                    <AiOutlineClose onClick={onClose} className="modal-xl-close"/>
                </h2>
                <h1>{message}</h1>
                {children}
                <div className="mt-3">
                    <Button onClick={onConfirm} title="Save" cssClass="px-4" />
                    <span className="float-end">
                        <ImgButton onChange={onImageSelect} />
                    </span>
                </div>
            </div>
        </Modal>
    )
}