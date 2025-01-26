import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";
import { BankAccountTypeEnum } from "../../../../../app/entities";

export const NewAccountModal = () => {
	const { isNewAccountModalOpen, closeNewAccountModal, errors, handleSubmit, register, control, isLoading } =
		useNewAccountModalController();

	return (
		<Modal title="Nova conta" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
			<form onSubmit={handleSubmit}>
				<div>
					<span className="text-gray-600 tracking[-0.5] text-sm">Saldo inicial</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking[-0.5] text-lg">R$</span>

						<Controller
							control={control}
							name="initialBalance"
							defaultValue={0.0}
							render={({ field: { onChange, value } }) => (
								<InputCurrency error={errors.initialBalance?.message} onChange={onChange} value={value} />
							)}
						/>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4">
					<Input type="text" placeholder="Nome da conta" error={errors.name?.message} {...register("name")} />

					<Controller
						control={control}
						name="type"
						defaultValue={BankAccountTypeEnum.checking}
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder="Tipo"
								onChange={onChange}
								error={errors.type?.message}
								value={value}
								options={[
									{
										label: "Conta corrente",
										value: "checking",
									},
									{
										label: "Conta poupança",
										value: "savings",
									},
								]}
							/>
						)}
					/>

					<Controller
						control={control}
						name="color"
						defaultValue="#40C057"
						render={({ field: { onChange, value } }) => (
							<ColorsDropdownInput onChange={onChange} error={errors.color?.message} value={value} />
						)}
					/>
				</div>

				<Button type="submit" className="w-full mt-6 text-sm" isLoading={isLoading}>
					Criar
				</Button>
			</form>
		</Modal>
	);
};
