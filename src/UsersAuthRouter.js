import React from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Roles } from "./infrastructure/Roles";
import { useAuth } from "./provider/AuthenticationWrapper";
import { routes } from "./Routes/Routes";

const role = new Roles();

export const UsersAuthRouter = ({element}) =>{
    const { isAuthenticated } = useAuth();

    const location = useLocation();
    
    if (!role.includes(isAuthenticated?.role)){
        return <Navigate to={routes.signIn} />;
    }
    if (role.isMember(isAuthenticated?.role)){
        if (location.pathname == routes.signIn){
            return <Navigate to={routes.clockIn} />;
        }
        return element;
    }
    return <Navigate to={routes.signIn} />;
}