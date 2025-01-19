import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export const NewTransactionModal = () => {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
	} = useNewTransactionModalController();

	const isExpense = newTransactionType === "expense";

	return (
		<Modal
			title={isExpense ? "Nova despesa" : "Nova receita"}
			open={isNewTransactionModalOpen}
			onClose={closeNewTransactionModal}
		>
			<form>
				<div>
					<span className="text-gray-600 tracking[-0.5] text-sm">Valor</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking[-0.5] text-lg">R$</span>
						<InputCurrency />
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						name="name"
						placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
					/>

					<Select
						placeholder="Categoria"
						options={[
							{
								label: "Conta corrente",
								value: "checking",
							},
							{
								label: "Conta poupança",
								value: "cash",
							},
						]}
					/>

					<Select
						placeholder={isExpense ? "Pagar com" : "Receber com"}
						options={[
							{
								label: "Conta corrente",
								value: "checking",
							},
							{
								label: "Conta poupança",
								value: "cash",
							},
						]}
					/>

					<DatePickerInput />
				</div>

				<Button className="w-full mt-6 text-sm">Criar</Button>
			</form>
		</Modal>
	);
};
