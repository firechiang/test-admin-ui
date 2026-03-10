import { createBrowserRouter, Navigate, Outlet, type RouteObject } from "react-router";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import ProtectedRoute from "@/components/protected-route";
import ProductList from "@/pages/product/product-list";
import ProductCreatePage from "@/pages/product/product-create.tsx";
import AgencyCreatePage from "@/pages/agency/agency-create.tsx";
import { PlateEditor } from "@/editor/plate-editor.tsx";
import { AuthProvider } from "@/components/auth-context";

const routers: RouteObject[] = [
    {
        // 根布局路由：提供 AuthProvider 上下文给所有子路由
        element: (
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        ),
        children: [
            {
                path: "/",
                element: <Navigate to="/login" replace />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "dashboard",
                id: "Dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        id: "product",
                        path: "/dashboard/product",
                        element: <ProductList />
                    }, {
                        id: "product-create",
                        path: "/dashboard/product-create",
                        element: <ProductCreatePage />

                    }, {
                        id: "agency-create",
                        path: "/dashboard/agency-create",
                        element: <AgencyCreatePage />
                    }, {
                        id: "editor",
                        path: "/dashboard/editor",
                        element: <PlateEditor />
                    }
                ]
            }
        ]
    }
];

export const router = createBrowserRouter(routers);