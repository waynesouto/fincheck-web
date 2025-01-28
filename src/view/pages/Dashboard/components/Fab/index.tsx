import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export const Fab = () => {
	const { openNewAccountModal, openNewTransactionModal } = useDashboard();

	return (
		<div className="fixed right-4 bottom-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button className=" bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
						<PlusIcon className="w-6 h-6" />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("expense")}>
						<CategoryIcon type="expense" />
						Nova despesa
					</DropdownMenu.Item>

					<DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("income")}>
						<CategoryIcon type="income" />
						Nova receita
					</DropdownMenu.Item>

					<DropdownMenu.Item onSelect={openNewAccountModal} className="gap-2">
						<BankAccountIcon />
						Nova conta
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
};
