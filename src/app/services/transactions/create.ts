import { ITransaction } from "../../entities";
import { CustomOmit } from "../../utils/type";
import { api, ApiResponse } from "../api";

export type CreateTransactionParams = CustomOmit<ITransaction, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

export type CreateTransactionResponse = { transaction: ITransaction }

export const create = async (params: CreateTransactionParams) => {
  const { data } = await api.post<ApiResponse<CreateTransactionResponse>>("/transactions", params);
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
};