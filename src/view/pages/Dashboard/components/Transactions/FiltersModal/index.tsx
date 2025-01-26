import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModalController } from "./useFiltersModalController";
import { cn } from "../../../../../../app/utils/cn";
import { HandleApplyFiltersParams } from "../useTransactionsController";

type FiltersModalProps = {
	open: boolean;
	onClose(): void;
	onApplyFilters(filters: HandleApplyFiltersParams): void;
};

export const FiltersModal = ({
	open,
	onClose,
	onApplyFilters,
}: FiltersModalProps) => {
	const {
		selectBankAccountId,
		selectedYear,
		accounts,
		handleSelectBankAccount,
		handleChangeYear,
	} = useFiltersModalController();

	return (
		<Modal open={open} onClose={onClose} title="Filtros">
			<div className="text-gray-800">
				<strong className="text-lg tracking-[-1px]">Conta</strong>

				<div className="space-y-2 mt-2">
					{accounts.map((account) => (
						<button
							key={account.id}
							onClick={() => handleSelectBankAccount(account.id)}
							className={cn(
								"p-2 rounded-2xl w-full text-left hover:bg-gray-50",
								account.id === selectBankAccountId && "!bg-gray-200"
							)}
						>
							{account.name}
						</button>
					))}
				</div>
			</div>

			<div className="text-gray-800 mt-10">
				<strong className="text-lg tracking-[-1px]">Ano</strong>

				<div className="mt-2 w-52 flex items-center justify-between">
					<button
						onClick={() => handleChangeYear(-1)}
						className="w-12 h-12 flex items-center justify-center"
					>
						<ChevronLeftIcon className="w-6 h-6" />
					</button>
					<div className="flex-1 text-center">
						<span className="text-sm font-medium tracking-[-0.5px]">
							{selectedYear}
						</span>
					</div>
					<button
						onClick={() => handleChangeYear(1)}
						className="w-12 h-12 flex items-center justify-center"
					>
						<ChevronRightIcon className="w-6 h-6" />
					</button>
				</div>
			</div>

			<Button
				className="w-full mt-10 text-sm"
				onClick={() =>
					onApplyFilters({
						bankAccountId: selectBankAccountId,
						year: selectedYear,
					})
				}
			>
				Aplicar filtros
			</Button>
		</Modal>
	);
};
