import React, {createContext, useContext} from "react";
import {type Admin, authService} from "@/services/auth-service";

interface AuthContextType {
    isAuth: () => boolean,
    getAdmin: () => Promise<Admin>,
    login: (uname: string, pwd: string) => Promise<void>,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * 授权登陆状态上下文
 * @param children
 * @constructor
 */
export function AuthProvider({children}: { children: React.ReactNode }) {

    const login = async (uname: string, pwd: string) => {
        try {
            await authService.login(uname, pwd);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    const logout = () => {
        authService.logout();
    }

    const isAuth = (): boolean => {
        return authService.isAuthenticated();
    }

    const getAdmin = async (): Promise<Admin> => {
        try {
            const admin = await authService.getAdmin();
            return admin;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return (
        <AuthContext.Provider value={{isAuth, getAdmin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}