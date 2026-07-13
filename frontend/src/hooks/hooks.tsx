import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import type { InterfaceAuthContext } from "../context/AuthContext";

import { ThemeContext } from "../context/ThemeContext";
import type { InterfaceThemeContext } from "../context/ThemeContext";


export function useAuth() : InterfaceAuthContext|null {
    return useContext(AuthContext);
}

export function useTheme() : InterfaceThemeContext|null {
    return useContext(ThemeContext);
}