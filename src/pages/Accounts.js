import React, { useState } from "react";
import { ButtonCard } from "../widgets/ButtonCard";
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import img from '../images/lamp.gif';
import { AccountList } from "../account/AccountSignIn";
import { useAccounts } from "../provider/AccountsWrapper";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { ButtonCardSm } from "../widgets/ButtonCardSm";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Loading } from "../components/Loading";


export const Accounts = () =>{
    const { user } = useAuth();
    const { account, accounts, availableAccounts, selectNewAccount, loading } = useAccounts();

    const navigate = useNavigate();

    const isSelected = (acc) =>{
        return account?.id === acc.id;
    }

    return(
        <div>
            <div className="d-flex align-items-center W-100">
                <div>
                    <ButtonCardSm onClick={()=>navigate(routes.nested().newAccount())} title={<div className="text-center">New Account</div>} />
                </div>
                <div className="px-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                </div>
            </div>

            <div className="px-2 pb-1 mb-2 mt-3 fw-bold border-bottom border-secondary">Current AddAccounts</div>
            
            <div className="justify-content-center overflow-auto h-100">
                {accounts.map((acc, key)=>(
                    <ButtonCardSm  
                        title={
                            <div>
                                <div>{acc.name}</div>
                                <div className="fst-italic fw-normal">Switch Account</div>
                            </div>
                        }
                        image={img}
                        onClick={()=>selectNewAccount(acc)} 
                        isSelected={account?.id === acc.id}
                        key={key} 
                    />
                ))}
            </div>

            <div className="px-2 pb-1 mb-2 mt-5 fw-bold border-bottom border-secondary">Available Accounts</div>
            
            <div className="justify-content-center overflow-auto h-100">
                {availableAccounts.map((acc, key)=>(
                    <ButtonCardSm  
                        title={
                            <div>
                                <div>{acc.name}</div>
                                <div className="fst-italic fw-normal">Manage Account</div>
                            </div>
                        }
                        image={img}
                        onClick={()=>navigate(`${routes.nested().manageAccount()}:${acc?.id}`, {state: acc})}
                        key={key} 
                    />
                ))}
            </div>
            <Loading loading={loading} />
        </div>
    )
}