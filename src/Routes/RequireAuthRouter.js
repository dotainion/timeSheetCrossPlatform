import React from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Roles } from "../infrastructure/Roles";
import { useAuth } from "../provider/AuthenticationWrapper";
import { routes } from "./Routes";

const role = new Roles();

export const RequireAuthRouter = ({element, isAdmin}) =>{
    const { isAuthenticated } = useAuth();

    const location = useLocation();

    if (isAuthenticated){
        if (!role.includes(isAuthenticated?.role)){
            return <Navigate to={routes.signIn} />;
        }
        if (role.isSuperior(isAuthenticated?.role) && isAdmin){
            if (location.pathname == routes.signIn){
                return <Navigate to={routes.admin()} />;
            }
            return element;
        }
        if (role.isMember(isAuthenticated?.role) && !isAdmin){
            if (location.pathname == routes.signIn){
                return <Navigate to={routes.clockIn} />;
            }
            return element;
        }
        if (role.isSuperior(isAuthenticated?.role) && location.pathname == routes.signIn){
            return <Navigate to={routes.admin()} />;
        }
        if (role.isMember(isAuthenticated?.role) && location.pathname == routes.signIn){
            return <Navigate to={routes.admin()} />;
        }
    }
    if (location.pathname == routes.signIn || location.pathname == routes.register){
        return element;
    }
    return <Navigate to={routes.signIn} />;
}