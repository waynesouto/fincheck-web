import { ITransaction } from "../../entities";
import { api, ApiResponse } from "../api";

export type UpdateTransactionParams = {
	id: string;
	data: Partial<Pick<ITransaction, "bankAccountId" | "categoryId" | "description" | "date" | "type" | "value">>;
};

export type UpdateTransactionResponse = { transaction: ITransaction };

export const update = async ({ id, data }: UpdateTransactionParams) => {
	const result = await api.patch<ApiResponse<UpdateTransactionResponse>>(`/transactions/${id}`, data);
	if (result.data.process === "failed") {
		throw new Error(result.data.body);
	}

	return result.data.body;
};
