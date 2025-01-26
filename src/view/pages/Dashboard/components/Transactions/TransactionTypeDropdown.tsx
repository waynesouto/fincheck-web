import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { TransactionType } from "../../../../../app/entities";

type TransactionTypeDropdownProps = {
	onSelect(type: TransactionType | undefined): void;
	selectedType?: TransactionType;
};

export const TransactionTypeDropdown = ({
	onSelect,
	selectedType,
}: TransactionTypeDropdownProps) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<button className="flex items-center gap-2">
					{selectedType === "income" && <IncomeIcon />}
					{selectedType === "expense" && <ExpensesIcon />}
					{selectedType === undefined && <TransactionsIcon />}

					<span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
						{selectedType === "income" && "Despesas"}
						{selectedType === "expense" && "Receitas"}
						{selectedType === undefined && "Transações"}
					</span>

					<ChevronDownIcon className="text-gray-900" />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className="w-[279px]">
				<DropdownMenu.Item
					className="gap-2"
					onSelect={() => onSelect("income")}
				>
					<IncomeIcon /> Receitas
				</DropdownMenu.Item>
				<DropdownMenu.Item
					className="gap-2"
					onSelect={() => onSelect("expense")}
				>
					<ExpensesIcon /> Despesas
				</DropdownMenu.Item>

				<DropdownMenu.Item
					className="gap-2"
					onSelect={() => onSelect(undefined)}
				>
					<TransactionsIcon /> Transações
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
