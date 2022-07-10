import React from 'react';
import error404 from '../images/404.jpg';
import { useNavigate } from 'react-router-dom';


export const PageNotFound = () =>{
    const navigate = useNavigate();
    return(
        <div className="text-center container text-secondary">
            <div className="display-6 fw-bold mt-5">Ooops!!</div>
            <div className="display-6">404 ERROR!!</div>
            <div className="display-3 fw-bold">PAGE NOT FOUND</div>
            <div className="w-75 m-auto">
                <img className="w-100" src={error404} />
            </div>
            <div className="display-6 fw-bold">OH NO!</div>
            <button className="btn btn-secondary mb-3">GO BACK HOME</button>
        </div>
    )
}