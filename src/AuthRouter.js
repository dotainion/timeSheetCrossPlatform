import React from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Roles } from "./infrastructure/Roles";
import { useAuth } from "./provider/AuthenticationWrapper";
import { routes } from "./Routes/Routes";

const role = new Roles();

export const AuthRouter = ({element, isAdmin}) =>{
    const { isAuthenticated } = useAuth();

    const location = useLocation();

    if (isAuthenticated){
        if (!role.includes(isAuthenticated?.role)){
            return <Navigate to={routes.signIn} />;
        }
        if (role.isSuperior(isAuthenticated?.role) && isAdmin){
            if (location.pathname == routes.signIn){
                return <Navigate to={routes.dashboard} />;
            }
            return element;
        }
        if (role.isMember(isAuthenticated?.role) && !isAdmin){
            if (location.pathname == routes.signIn){
                return <Navigate to={routes.clockIn} />;
            }
            return element;
        }
    }
    if (location.pathname == routes.signIn || location.pathname == routes.register){
        return element;
    }
    return <Navigate to={routes.signIn} />;
}