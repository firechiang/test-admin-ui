"use client"

import '@/App.css';
import {NavSidebar} from "@/pages/nav-sidebar";
import {NavUser} from "@/pages/nav-user";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar";
import {Fragment} from "react";
import {Link, Outlet, useMatches} from "react-router";

export default function Dashboard() {

    const matches = useMatches();

    return (
        <SidebarProvider>
            <NavSidebar/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbList>
                                {
                                    matches.map((matche, index) => {
                                        if (index + 1 !== matches.length) {
                                            return (
                                                <Fragment key={matche.id}>
                                                    <BreadcrumbItem className="hidden md:block">
                                                        <BreadcrumbLink asChild>
                                                            <Link to={matche.pathname}>{matche.id}</Link>
                                                        </BreadcrumbLink>
                                                    </BreadcrumbItem>
                                                    <BreadcrumbSeparator className="hidden md:block"/>
                                                </Fragment>
                                            )
                                        }
                                        return (
                                            <Fragment key={matche.id}>
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage>{matche.id}</BreadcrumbPage>
                                                </BreadcrumbItem>
                                            </Fragment>
                                        )
                                    })
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-4">
                        <NavUser/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                        {/* 子路由的内容渲染在这里 */}
                        <Outlet/>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}