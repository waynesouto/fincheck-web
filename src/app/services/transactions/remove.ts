import { EmptyObject } from "react-hook-form";
import { api, ApiResponse } from "../api";

export type RemoveTransactionParams = {
	id: string;
};

export type RemoveTransactionResponse = EmptyObject;

export const remove = async ({ id }: RemoveTransactionParams) => {
	const result = await api.delete<ApiResponse<RemoveTransactionResponse>>(`/transactions/${id}`);
	if (result.data.process === "failed") {
		throw new Error(result.data.body);
	}

	return result.data.body;
};
