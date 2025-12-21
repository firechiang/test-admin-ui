"use client"

import {RouterProvider} from "react-router";
import {router} from "@/router";
import {AuthProvider} from "@/components/auth-context";
import {Toaster} from "@/components/ui/sonner";

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
            <Toaster richColors={true} position="top-center"/>
        </AuthProvider>
    )
}

