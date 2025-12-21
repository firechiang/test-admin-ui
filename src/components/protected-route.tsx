import {Navigate} from "react-router";
import {useAuth} from "@/components/auth-context";

/**
 * 路由守卫 (ProtectedRoute)：保护私有页面
 * @param children
 * @constructor
 */
export default function ProtectedRoute({children}: { children: React.ReactNode }) {
    const {isAuth} = useAuth();
    // 检查是否登陆
    if (!isAuth()) {
        return <Navigate to="/login" replace/>
    }
    return (
        <>{children}</>
    )
}