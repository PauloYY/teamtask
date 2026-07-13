import {createContext, useEffect, useState, type ReactNode} from "react";

interface Properties {
    children : ReactNode;
}

type TypeTheme = "light"|"dark";

export interface InterfaceThemeContext {
    theme : TypeTheme;
    toLight : () => void;
    toDark : () => void;
}

export const ThemeContext = createContext<InterfaceThemeContext|null>(null);

export default function ThemeProvider({children} : Properties) {
    const [theme, setTheme] = useState<TypeTheme>("light");

    useEffect(() => {

        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme);
    })

    function toLight(){
        setTheme("light");
    }

    function toDark(){
        setTheme("dark");
    }

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            toLight: toLight,
            toDark: toDark
        }}>
            {children}
        </ThemeContext.Provider>
    )
}