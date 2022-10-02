import React, { useState } from "react";
import { Loading } from "../components/Loading";
import logo from '../images/logo.png';


export const AccountsContainer = ({children}) =>{
    const [loading, setLoading] = useState(false);

    return(
        <div className="sign-in-container">
            <div className="sign-in-card overflow-hidden">
                <div className="d-flex h-100 position-relative">
                    <div className="w-50 position-relative bg-primary">
                        <div className="sign-in-logo-container">
                            <img src={logo} draggable={false} />
                        </div>
                    </div>
                    <div className="w-100 position-relative px-5 my-5">
                        {children}
                    </div>
                    <Loading loading={loading} />
                </div>
            </div>
        </div>
    )
}