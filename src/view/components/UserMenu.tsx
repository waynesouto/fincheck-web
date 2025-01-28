import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export const UserMenu = () => {
	const { logout, user } = useAuth();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border-teal-100">
					<span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
						{user?.name.slice(0, 2).toUpperCase()}
					</span>
				</div>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className="w-32">
				<DropdownMenu.Item onSelect={logout} className="flex items-center justify-between">
					Sair
					<ExitIcon className="w-4 h-4" />
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
