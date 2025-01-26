import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { ITransaction } from "../../../../../app/entities";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

type EditTransactionModalProps = {
	transaction: ITransaction | null;
	open: boolean;
	onClose(): void;
};

export const EditTransactionModal = ({ transaction, open, onClose }: EditTransactionModalProps) => {
	const {
		control,
		errors,
		handleSubmit,
		register,
		accounts,
		categories,
		isDeleteModalOpen,
		handleCloseDeleteModal,
		handleDeleteTransaction,
		isLoadingDelete,
		handleOpenDeleteModal,
	} = useEditTransactionModalController(transaction, onClose);

	const isExpense = transaction?.type === "expense";

	if (isDeleteModalOpen) {
		return (
			<ConfirmDeleteModal
				title={`Tem certeza que deseja excluir esta ${isExpense ? "despesa" : "receita"}`}
				onClose={handleCloseDeleteModal}
				onConfirm={handleDeleteTransaction}
				isLoading={isLoadingDelete}
			/>
		);
	}

	return (
		<Modal
			title={isExpense ? "Editar despesa" : "Editar receita"}
			open={open}
			onClose={onClose}
			rightAction={
				<button onClick={handleOpenDeleteModal}>
					<TrashIcon className="w-6 h-6 text-red-900" />
				</button>
			}
		>
			<form onSubmit={handleSubmit}>
				<div>
					<span className="text-gray-600 tracking[-0.5] text-sm">Valor</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking[-0.5] text-lg">R$</span>
						<Controller
							control={control}
							name="value"
							defaultValue={0.0}
							render={({ field: { onChange, value } }) => (
								<InputCurrency error={errors.value?.message} onChange={onChange} value={value} />
							)}
						/>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
						error={errors.description?.message}
						{...register("description")}
					/>

					<Controller
						control={control}
						name="categoryId"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder="Categoria"
								error={errors.categoryId?.message}
								onChange={onChange}
								value={value ?? undefined}
								options={categories.map((category) => ({
									label: category.name,
									value: category.id,
								}))}
							/>
						)}
					/>

					<Controller
						control={control}
						name="bankAccountId"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder={isExpense ? "Pagar com" : "Receber com"}
								error={errors.bankAccountId?.message}
								onChange={onChange}
								value={value}
								options={accounts.map((account) => ({
									label: account.name,
									value: account.id,
								}))}
							/>
						)}
					/>

					<Controller
						control={control}
						name="date"
						defaultValue={new Date()}
						render={({ field: { value, onChange } }) => (
							<DatePickerInput error={errors.date?.message} value={value} onChange={onChange} />
						)}
					/>
				</div>

				<Button className="w-full mt-6 text-sm">Salvar</Button>
			</form>
		</Modal>
	);
};
