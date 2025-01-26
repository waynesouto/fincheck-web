import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";
import { Button } from "./Button";

type ConfirmDeleteModalProps = {
	title: string;
	description?: string;
	isLoading: boolean;
	onClose(): void;
	onConfirm(): void;
};

export const ConfirmDeleteModal = ({ title, description, isLoading, onClose, onConfirm }: ConfirmDeleteModalProps) => {
	return (
		<Modal open onClose={onClose} title="Excluir">
			<div className="flex flex-col items-center text-center gap-6">
				<div className="w-[52px] h-[52px] rounded-full bg-red-100 flex items-center justify-center">
					<TrashIcon className="w-6 h-6 text-red-900" />
				</div>

				<p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">{title}</p>
				{description && <p className="tracking-[-0.5px] text-gray-800 font-light">{description}</p>}
			</div>
			<div className="mt-10 space-y-4">
				<Button className="w-full" variant="danger" onClick={onConfirm} isLoading={isLoading}>
					Sim, desejo excluir
				</Button>

				<Button className="w-full" variant="ghost" onClick={onClose} disabled={isLoading}>
					Cancelar
				</Button>
			</div>
		</Modal>
	);
};
