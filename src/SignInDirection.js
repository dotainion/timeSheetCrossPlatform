import React from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Roles } from "./infrastructure/Roles";
import { useAuth } from "./provider/AuthenticationWrapper";
import { routes } from "./Routes/Routes";

const role = new Roles();

export const SignInDirection = ({element}) =>{
    const { isAuthenticated } = useAuth();

    const location = useLocation();

    if (isAuthenticated){
        console.log('hello world');
        if (role.isMember(isAuthenticated?.role)){
            return <Navigate to={routes.clockIn} replace />;
        }
        if (role.isSuperior(isAuthenticated?.role)){
            return <Navigate to={{pathname: routes.dashboard}} replace />;
        }
    }
    return element;
}