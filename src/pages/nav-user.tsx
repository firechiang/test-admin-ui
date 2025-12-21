import {BadgeCheck, Bell, CreditCard, LogOut, Sparkles,} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from "@/components/ui/sidebar";

import {type Admin} from "@/services/auth-service";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useAuth} from "@/components/auth-context.tsx";
import DefaultAvatar from "@/assets/default-avatar.png";


export function NavUser() {
    const {isMobile} = useSidebar()
    const [admin, setAdmin] = useState<Admin | null>(null);
    const navigate = useNavigate();
    const {getAdmin, logout} = useAuth();
    useEffect(() => {
        (async () => {
            const admin = await getAdmin();
            setAdmin(admin);
        })();
    }, []);

    const clickLogout = () => {
        logout();
        navigate("/login", {replace: true});
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-full">
                                <AvatarImage src={admin?.avatar} alt={admin?.name}/>
                                <AvatarFallback className="rounded-lg">
                                    <img src={DefaultAvatar} alt="Default" className="aspect-square h-full w-full"/>
                                </AvatarFallback>
                            </Avatar>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "bottom"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={admin?.avatar} alt={admin?.name}/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{admin?.name}</span>
                                    <span className="truncate text-xs">outlook@sds.com</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles/>
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard/>
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={clickLogout} className="cursor-pointer disabled:cursor-not-allowed">
                            <LogOut/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
