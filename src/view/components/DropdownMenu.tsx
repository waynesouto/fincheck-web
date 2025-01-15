import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

type DropdownMenuContentProps = {
	children: React.ReactNode;
	className?: string;
};

type DropdownMenuItemProps = {
	children: React.ReactNode;
	className?: string;
	onSelect?(): void;
};

export const DropdownMenuRoot = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
};

export const DropdownMenuTrigger = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<RdxDropdownMenu.Trigger className="outline-none" asChild>
			{children}
		</RdxDropdownMenu.Trigger>
	);
};

export const DropdownMenuContent = ({
	children,
	className,
}: DropdownMenuContentProps) => {
	return (
		<RdxDropdownMenu.Portal>
			<RdxDropdownMenu.Content
				className={cn(
					"rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]",
					"data-[side=bottom]:animate-slide-up-and-fade",
					"data-[side=top]:animate-slide-down-and-fade",
					className
				)}
			>
				{children}
			</RdxDropdownMenu.Content>
		</RdxDropdownMenu.Portal>
	);
};

export const DropdownMenuItem = ({
	children,
	className,
	onSelect,
}: DropdownMenuItemProps) => {
	return (
		<RdxDropdownMenu.Item
			onSelect={onSelect}
			className={cn(
				"min-h-[40px] outline-none flex items-center py-2 px-4 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
				className
			)}
		>
			{children}
		</RdxDropdownMenu.Item>
	);
};

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem,
};
