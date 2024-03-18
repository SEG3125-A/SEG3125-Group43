import { useContext } from "react";
import { AuthContext } from "../context/auth.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};