import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/hooks";

export default function ProtectedRoute(){
    const auth = useAuth();
    
    if(auth?.infoAuth.authenticated){
        return <Outlet />
    }

    return <Navigate to={"/login"} replace />
}