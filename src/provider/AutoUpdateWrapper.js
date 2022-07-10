import React, { createContext, useContext, useEffect, useState } from "react";


const Context = createContext();
export const useAutoUpdate = () => useContext(Context);

export const AutoUpdateWrapper = ({children}) =>{

    return(
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}