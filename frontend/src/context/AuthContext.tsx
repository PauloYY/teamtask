import { createContext, useState, type ReactNode } from "react";
import * as auth from "../services/auth.service";
import type { AuthResponse, ServiceResult } from "../mock/types";

interface Properties {
    children: ReactNode;
}

interface InfoAuth {
    authenticated : boolean;
    token? : string;
    user? : {
        id : number,
        name : string,
        email : string
    };
}

export interface InterfaceAuthContext {
    infoAuth : InfoAuth;
    login: (email : string, password : string) => ServiceResult<AuthResponse>;
    logout: () => void;
}

export const AuthContext = createContext<InterfaceAuthContext|null>(null);

export default function AuthProvider( {children} : Properties ){
    const [infoAuth, setInfoAuth] = useState<InfoAuth>( {authenticated: false} );

    function login( email : string, password : string ) : ServiceResult<AuthResponse>{
        const response = auth.login({email, password});

        if(!response.success){
            return response;
        }

        localStorage.setItem("token", response.data.token);

        setInfoAuth({...(response.data), authenticated: true});

        return response;
    }

    function logout(){
        localStorage.removeItem("token");

        setInfoAuth({authenticated: false});
    }

    return(
        <AuthContext.Provider value={{
            infoAuth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}