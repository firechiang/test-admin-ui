import {useState, useCallback} from 'react';
import axios, {type InternalAxiosRequestConfig, type AxiosResponse} from 'axios';
import {authService} from "@/services/auth-service";
import {toast} from "sonner";

const GET_METHOD = "GET";
const POST_METHOD = "POST";

export interface RestRes<T> {
    result: T
}

// 创建api实例
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
});

// 拦截请求，自动注入Token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = authService.getToken();
        // 如果Token存在，则添加到请求头
        if (token && config.headers) {
            config.headers.setAuthorization(`Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// 响应拦截，统一错误处理
api.interceptors.response.use(
    (response: AxiosResponse<RestRes<any>>) => {
        return response.data.result;
    },
    (error) => {
        if (!error.response) {
            if (error.code === 'ECONNABORTED') {
                error.message = "请求超时，请稍后重试！";
            } else {
                error.message = "网络连接失败，请检查您的网络或服务器状态！";
            }
        }
        // 未登陆授权
        if (error.response?.status === 401) {
            // 清除本地过期Token
            authService.logout();
            // 跳转到登陆页面
            window.location.href = "/login";
        }
        toast.error(error.message);
        return Promise.reject(error);
    }
);

export const useHttpPost = <T>() => {

    return useHttp<T>(POST_METHOD);
}

/**
 * T: 返回数据的类型
 */
export const useHttpGet = <T>() => {

    return useHttp<T>(GET_METHOD);
}

/**
 * T: 返回数据的类型
 */
export function useHttp<T>(method: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const run = useCallback(async (endpoint: string, param: {
        [key: string]: unknown
    }): Promise<void> => {
        setLoading(true);
        try {
            const response = await api({
                url: endpoint,
                method: method,
                params: method === GET_METHOD ? param : undefined,
                data: method !== GET_METHOD ? param : undefined,
            });
            const data = response.data;
            setData(data);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }, [method]);

    return {data, loading, run, setData};
}
