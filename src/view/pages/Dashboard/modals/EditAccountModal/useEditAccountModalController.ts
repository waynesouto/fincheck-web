import { z } from "zod"
import { useDashboard } from "../../components/DashboardContext/useDashboard"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountsService } from "../../../../../app/services/bankAccounts"
import { notification } from "../../../../../app/utils/notification"
import { UpdateBankAccountParams } from "../../../../../app/services/bankAccounts/update"
import { useState } from "react"
import { RemoveBankAccountParams } from "../../../../../app/services/bankAccounts/remove"

const schema = z.object({
	initialBalance: z.number().nonnegative('Saldo inicial é obrigatório'),
	name: z.string().nonempty('Nome da conta é obrigatório'),
	type: z.enum(['checking', 'savings']),
	color: z.string().nonempty('Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export const useEditAccountModalController = () => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const {accountBeingEdited, isEditAccountModalOpen, closeEditAccountModal} = useDashboard()

		const {
			register,
			handleSubmit: hookFormSubmit,
			formState: { errors },
			control,
		} = useForm<FormData>({
			resolver: zodResolver(schema),
			defaultValues: {
				name: accountBeingEdited?.name,
				color: accountBeingEdited?.color,
				initialBalance: accountBeingEdited?.initialBalance,
				type: accountBeingEdited?.type
			}
		});

		const queryClient = useQueryClient();
		const {isPending: isLoadingUpdate, mutateAsync: updateAccount} = useMutation({
			mutationFn: (data: UpdateBankAccountParams) => bankAccountsService.update(data)
		});
		const {isPending: isLoadingDelete, mutateAsync: removeAccount} = useMutation({
			mutationFn: (data: RemoveBankAccountParams) => bankAccountsService.remove(data)
		});

		const handleSubmit = hookFormSubmit(async (data) => {
	 try {
			await updateAccount({
				id: accountBeingEdited!.id,
				data
			});

			queryClient.invalidateQueries({queryKey: ['bankAccounts']})
			notification("A conta editada com sucesso", 'success')
			closeEditAccountModal()
		} catch (err) {
			notification("Erro ao salvar as alterações da conta" + err, "error");
		}
	})

	const handleOpenDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false)
	}

	const handleDeleteAccount = async() => {
		try {
			await removeAccount({id: accountBeingEdited!.id,});

			queryClient.invalidateQueries({queryKey: ['bankAccounts']})
			notification("A conta foi deletada com sucesso", 'success')
			closeEditAccountModal()
		} catch (err) {
			notification("Erro ao deletar a conta " + err, "error");
		}
	}

	return {isEditAccountModalOpen, closeEditAccountModal, register, errors, handleSubmit, control, isLoadingUpdate, accountBeingEdited, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, handleDeleteAccount, isLoadingDelete}
}