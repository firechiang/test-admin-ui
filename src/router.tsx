import {createBrowserRouter, Navigate, type RouteObject} from "react-router";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import ProtectedRoute from "@/components/protected-route";
import ProductList from "@/pages/product/product-list";
import ProductCreatePage from "@/pages/product/product-create.tsx";
import { PlateEditor } from "@/editor/plate-editor.tsx";

const routers: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/login" replace/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "dashboard",
        id: "Dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
        ),
        children: [
            {
                id: "product",
                path: "/dashboard/product",
                element: <ProductList/>
            },{
                id: "product-create",
                path: "/dashboard/product-create",
                element: <ProductCreatePage/>

            },{
                id: "editor",
                path: "/dashboard/editor",
                element: <PlateEditor/>
            }
        ]
    }
];

export const router = createBrowserRouter(routers);