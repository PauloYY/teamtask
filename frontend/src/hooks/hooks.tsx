import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import type { InterfaceAuthContext } from "../context/AuthContext";

export function useAuth() : InterfaceAuthContext|null {
    return useContext(AuthContext);
}