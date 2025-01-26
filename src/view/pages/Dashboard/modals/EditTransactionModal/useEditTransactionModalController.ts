import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactions";
import { ITransaction } from "../../../../../app/entities";
import { notification } from "../../../../../app/utils/notification";

const schema = z.object({
	value: z.number().nonnegative("Informe o valor"),
	description: z.string().nonempty("Informe a descrição"),
	categoryId: z.string().nullable(),
	bankAccountId: z.string().nonempty("Informe a conta bancária"),
	date: z.date(),
});

type FormData = z.infer<typeof schema>;

export const useEditTransactionModalController = (transaction: ITransaction | null, onClose: () => void) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			bankAccountId: transaction?.bankAccountId,
			categoryId: transaction?.categoryId,
			date: transaction?.date !== undefined ? new Date(transaction?.date) : undefined,
			description: transaction?.description,
			value: transaction?.value,
		},
	});

	const { accounts } = useBankAccounts();
	const { categories } = useCategories();

	const queryClient = useQueryClient();
	const { isPending: isLoadingUpdate, mutateAsync: updateTransaction } = useMutation({
		mutationFn: transactionsService.update,
	});
	const { isPending: isLoadingDelete, mutateAsync: removeTransaction } = useMutation({
		mutationFn: transactionsService.remove,
	});

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await updateTransaction({
				id: transaction!.id,
				data,
			});

			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
			notification(`${transaction?.type === "income" ? "Receita" : "Despesa"} editada com sucesso`, "success");
			onClose();
		} catch (err) {
			notification("Erro ao salvar as alterações da transação" + err, "error");
		}
	});

	const handleDeleteTransaction = async () => {
		try {
			await removeTransaction({ id: transaction!.id });

			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
			notification(`${transaction?.type === "income" ? "Receita" : "Despesa"} deletada com sucesso`, "success");
			onClose();
		} catch (err) {
			notification("Erro ao deletar transação" + err, "error");
		}
	};

	const filterCategories = useMemo(() => {
		return categories.filter((category) => category.type === transaction?.type);
	}, [categories, transaction?.type]);

	const handleOpenDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	return {
		register,
		control,
		errors,
		isDeleteModalOpen,
		accounts,
		categories: filterCategories,
		isLoading: isLoadingUpdate,
		isLoadingDelete,
		handleSubmit,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleDeleteTransaction,
	};
};
