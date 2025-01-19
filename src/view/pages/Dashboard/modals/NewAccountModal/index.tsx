import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export const NewAccountModal = () => {
	const { isNewAccountModalOpen, closeNewAccountModal } =
		useNewAccountModalController();

	return (
		<Modal
			title="Nova conta"
			open={isNewAccountModalOpen}
			onClose={closeNewAccountModal}
		>
			<form>
				<div>
					<span className="text-gray-600 tracking[-0.5] text-sm">Saldo</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking[-0.5] text-lg">R$</span>
						<InputCurrency />
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4">
					<Input type="text" name="name" placeholder="Nome da conta" />

					<Select
						placeholder="Tipo"
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

					<ColorsDropdownInput />
				</div>

				<Button className="w-full mt-6 text-sm">Criar</Button>
			</form>
		</Modal>
	);
};
