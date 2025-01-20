import { z } from "zod"
import { useDashboard } from "../../components/DashboardContext/useDashboard"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BankAccountTypeEnum } from "../../../../../app/entities"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateBankAccountParams } from "../../../../../app/services/bankAccounts/create"
import { bankAccountsService } from "../../../../../app/services/bankAccounts"
import { notification } from "../../../../../app/utils/notification"

const schema = z.object({
	initialBalance: z.number().nonnegative('Saldo inicial é obrigatório'),
	name: z.string().nonempty('Nome da conta é obrigatório'),
	type: z.nativeEnum(BankAccountTypeEnum),
	color: z.string().nonempty('Cor é obrigatória')
})

type FormData = z.infer<typeof schema>

export const useEditAccountModalController = () => {
	const {isEditAccountModalOpen, closeEditAccountModal} = useDashboard()

		const {
			register,
			handleSubmit: hookFormSubmit,
			formState: { errors },
			control,
			reset,
		} = useForm<FormData>({
			resolver: zodResolver(schema),
		});

		const queryClient = useQueryClient();
		const {isPending, mutateAsync} = useMutation({
			mutationFn: (data: CreateBankAccountParams) => bankAccountsService.create(data)
		});

		const handleSubmit = hookFormSubmit(async (data) => {
	 try {
			await mutateAsync(data);

			queryClient.invalidateQueries({queryKey: ['bankAccounts']})
			notification("Conta cadastrada com sucesso", 'success')
			closeEditAccountModal()
			reset()
		} catch (err) {
			notification("Erro ao cadastrar conta bancária. " + err, "error");
		}
	})

	return {isEditAccountModalOpen, closeEditAccountModal, register, errors, handleSubmit, control, isPending}
}