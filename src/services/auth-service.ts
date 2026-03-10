import { api } from "@/utils/http";

// 管理员信息
export interface Admin {
    name: string,
    avatar: string,
}

const TOKEN_KEY = "auth_token";
const ADMIN_KEY = "admin_user";

export const authService = {
    async login(uname: string, pwd: string): Promise<string> {
        try {
            const token = await api.post<string, string>('/auth/login', {
                uname,
                pwd
            });
            this.setToken(token);
            return token;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // 登出
    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ADMIN_KEY);
    },
    // 存储Token
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },
    // 获取当前Token
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
    // 存储管理员信息
    setAdmin(admin: Admin): void {
        localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    },
    // 获取管理员信息
    async getAdmin(): Promise<Admin> {
        const adminJson = localStorage.getItem(ADMIN_KEY);
        if (adminJson && adminJson !== "undefined") {
            return JSON.parse(adminJson);
        }
        try {
            const admin = await api.get<any, Admin>("/auth/admin");
            this.setAdmin(admin);
            return admin;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // 判断是否已登陆
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};