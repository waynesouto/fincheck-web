import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactions";
import { notification } from "../../../../../app/utils/notification";

const schema = z.object({
	value: z.number().nonnegative("Informe o valor"),
	description: z.string().nonempty("Informe a descrição"),
	categoryId: z.string().nonempty("Informe a categoria"),
	bankAccountId: z.string().nonempty("Informe a conta bancária"),
	date: z.date(),
});

type FormData = z.infer<typeof schema>;

export const useNewTransactionModalController = () => {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
	} = useDashboard();

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient()
	const {accounts} = useBankAccounts()
	const {categories} = useCategories()
	const {isPending, mutateAsync, reset} = useMutation({
		mutationFn: transactionsService.create
	})

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
					await mutateAsync({
						...data,
						 type: newTransactionType!,
					});

					queryClient.invalidateQueries({queryKey: ['transactions']})
					notification(`${newTransactionType === 'income' ? 'Receita' : "Despesa"} cadastrada com sucesso`, 'success')
					closeNewTransactionModal()
					reset()
				} catch (err) {
					notification("Erro ao cadastrar transação " + err, "error");
				}
	});

	const filterCategories = useMemo(() => {
		return categories.filter((category) => category.type === newTransactionType)
	}, [categories, newTransactionType])


	return {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
		register,
		control,
		errors,
		handleSubmit,
		accounts,
		categories: filterCategories,
		isPending
	};
};
