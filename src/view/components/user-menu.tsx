import { useTheme } from "@/app/contexts/theme-context";
import { useAuth } from "@/app/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/view/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import { ChevronsUpDown, CircleUserIcon, LogOut, SettingsIcon, SunMoonIcon } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "./ui/sidebar";

export const UserMenu = () => {
	const { setTheme } = useTheme();
	const { logout, user } = useAuth();
	const { isMobile } = useSidebar();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground outline-none"
				>
					<Avatar className="h-8 w-8 rounded-full">
						{/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
						<AvatarFallback className="text-xs leading-none rounded-full">
							{user?.name.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{user?.name}</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<CircleUserIcon />
						Perfil
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon />
						Configurações
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<SunMoonIcon />
							Tema
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem onClick={() => setTheme("light")}>Claro</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>Escuro</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>Automático</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={logout}>
					<LogOut />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
