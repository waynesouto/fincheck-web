import { EmptyObject } from "react-hook-form";
import { api, ApiResponse } from "../api";

export type RemoveBankAccountParams = {
	id: string
}

export type RemoveBankAccountResponse = EmptyObject

export const remove = async ({id}: RemoveBankAccountParams) => {
  const result = await api.delete<ApiResponse<RemoveBankAccountResponse>>(`/bank-accounts/${id}`);
	if (result.data.process === 'failed') {
		throw new Error(result.data.body)
	}

  return result.data.body;
};