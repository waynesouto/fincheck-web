import { Controller } from "react-hook-form";
import { Button } from "@/view/components/ui/button";
import { DatePicker } from "@/view/components/ui/date-picker";
import { Input } from "@/view/components/ui/input";
import { InputCurrency } from "@/view/components/InputCurrency";
import { Modal } from "@/view/components/ui/modal";
import { Select } from "@/view/components/ui/select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Switch } from "@/view/components/ui/switch";
import { isAfter } from "date-fns";

export const NewTransactionModal = () => {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
		control,
		errors,
		handleSubmit,
		register,
		accounts,
		categories,
		// isPaidChanged,
		// isPaidToggle,
	} = useNewTransactionModalController();

	const isExpense = newTransactionType === "expense";

	return (
		<Modal
			title={isExpense ? "Nova despesa" : "Nova receita"}
			open={isNewTransactionModalOpen}
			onClose={closeNewTransactionModal}
		>
			<form onSubmit={handleSubmit}>
				<div>
					<div className="flex items-center gap-4">
						<span className="text-sm">R$</span>
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

				<div className="mt-6 flex flex-col gap-4">
					<Input
						containerClassName="w-full"
						placeholder="Descrição"
						type="text"
						error={errors.description?.message}
						{...register("description")}
					/>

					<div className="grid grid-cols-2 gap-4">
						<Controller
							control={control}
							name="bankAccountId"
							render={({ field: { onChange, value } }) => (
								<Select
									placeholder={isExpense ? "Pagar com" : "Receber com"}
									error={errors.bankAccountId?.message}
									onChange={(value) => {
										console.log({ value });
										onChange(value);
									}}
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
								<DatePicker
									error={errors.date?.message}
									value={value}
									onChange={(date) => {
										if (date && isAfter(date, new Date())) {
										}
										onChange(date);
									}}
								/>
							)}
						/>

						<Controller
							control={control}
							name="categoryId"
							render={({ field: { onChange, value } }) => (
								<Select
									className="col-span-2"
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
					</div>

					<Controller
						control={control}
						name="isPaid"
						defaultValue={true}
						render={({ field: { value, onChange } }) => (
							<Switch value={value} onChange={onChange} label={isExpense ? "Já foi pago" : "Já foi recebido"} />
						)}
					/>
				</div>

				<Button className="w-full mt-6 text-sm">Criar</Button>
			</form>
		</Modal>
	);
};
