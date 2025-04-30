"use client";

import * as React from "react";
import { ChevronRight, HomeIcon, ListChecksIcon, LucideIcon, PlusIcon, TagsIcon } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	SidebarSeparator,
} from "@/view/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";

export type ItemMenu = {
	title: string;
	url: string;
	icon?: LucideIcon;
	items?: Array<{
		title: string;
		url: string;
	}>;
};

type Menu = {
	navMain: {
		main: ItemMenu[];
		secondary: ItemMenu[];
	};
};

// This is sample data.
const data: Menu = {
	navMain: {
		main: [
			{
				title: "Visão geral",
				url: "#",
				icon: HomeIcon,
			},
			{
				title: "Extrato",
				url: "#",
				icon: ListChecksIcon,
			},
		],
		secondary: [
			{
				title: "Cadastros",
				url: "#",
				icon: TagsIcon,
				items: [
					{
						title: "Categorias",
						url: "#",
					},
				],
			},
		],
	},
};

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar collapsible="offcanvas" variant="floating" {...props}>
			{/* Header */}
			<SidebarHeader className="py-4">
				<Button className="text-xs p-4" variant="secondary">
					Novo lançamento <PlusIcon />
				</Button>
			</SidebarHeader>

			<SidebarSeparator />

			{/* Content */}
			<SidebarContent>
				{/* MainGroup */}
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navMain.main.map((item) => (
								<SidebarMenuItem>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				{/* SecondaryGroup */}
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navMain.secondary.map((item) => (
								<Collapsible key={item.title} asChild className="group/collapsible">
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.title}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<a href={subItem.url}>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<UserMenu />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
};
