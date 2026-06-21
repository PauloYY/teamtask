import { createContext, useState, type ReactNode } from "react";

interface Properties {
    children: ReactNode;
}

export interface InterfaceAuthContext {
    authenticated: boolean;
    login: Function;
    logout: Function;
}

export const AuthContext = createContext<InterfaceAuthContext|null>(null);

export default function AuthProvider( {children} : Properties ){
    const [token, setToken] = useState( localStorage.getItem("token") );

    function login(jwt : string){
        localStorage.setItem("token", jwt);
        setToken(jwt);
    }

    function logout(){
        localStorage.removeItem("token");
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{
            authenticated: !!token,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}