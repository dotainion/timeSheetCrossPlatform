import React, { createContext, useContext, useEffect, useState } from "react";


const Context = createContext();
export const useAutoUpdate = () => useContext(Context);

export const AutoUpdateWrapper = ({children}) =>{
    useEffect(()=>{
        //document.getElementById('root').style.border = '20px solid red';
    }, []);
    return(
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}