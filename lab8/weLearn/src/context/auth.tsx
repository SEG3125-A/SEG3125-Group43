/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, createContext } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import IsLoading from "../components/isLoading";

interface AuthContextType{
    user : User | null,
    isLoading : boolean,
}
export const AuthContext = createContext<AuthContextType>({
    user : null,
    isLoading : false,
});

interface AuthProviderProps { 
    children : React.ReactElement;
}
export const AuthProvider : FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    if (isLoading) {
        return <IsLoading />;
      }

    const value = {
        user, 
        isLoading,
    }
    return (
        <AuthContext.Provider
            value={value}/*{{
                user : null,
                isLoading : false,
            }}*/
        >
            {!isLoading && children}
        </AuthContext.Provider>
    );
}