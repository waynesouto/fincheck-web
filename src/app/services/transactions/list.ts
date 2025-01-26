import { ICategory, ITransaction, TransactionType } from "../../entities";
import { api, ApiResponse } from "../api";

export type ListTransactionsResponse = {
	transactions: Array<{
		category: ICategory | null
	} & ITransaction>
}

export type ListTransactionsRequest = Partial<{
	page: number
	bankAccountId: string
	month: number
	year: number
	type: TransactionType
}>

export const list = async (params: ListTransactionsRequest) => {
  const { data } = await api.get<ApiResponse<ListTransactionsResponse>>("/transactions", {
		params
	});
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
};