import React, { useEffect, useRef, useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosImages } from 'react-icons/io';
import $ from 'jquery';


export const ImgButton = ({onChange}) =>{
    const [img, setImg] = useState();

    const imageRef = useRef();

    const toBase64 = async(file) =>{
        try{
            return await new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file); 
            });
        }catch(error){
            console.log(error)
            return null;
        }
    };

    const openDir = () =>{
        imageRef.current.click();
    }

    useEffect(()=>{
        $(imageRef.current).on('change', async(e)=>{
            if (!e.target.files[0]) return;
            const img = await toBase64(e.target.files[0]);
            setImg(img);
            onChange?.(img);
        });
    }, []);
    return(
        <div className="d-inline-block position-relative" title="Upload image" tooltip="tooltip">
            <IoIosImages onClick={openDir} className="fs-1 pointer" />
            <input ref={imageRef} hidden type={'file'} />
            {img && <img 
                onClick={openDir} 
                src={img} 
                className="position-absolute top-100 start-50 translate-middle-x rounded-circle" 
                alt="" 
                style={{width: '80px', height: '80px'}} 
            />}
        </div>
    )
}