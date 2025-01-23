import { ICategory, ITransaction } from "../../entities";
import { api, ApiResponse } from "../api";

export type ListTransactionsResponse = {
	transactions: Array<{
		category: ICategory | null
	} & ITransaction>
}

export const list = async () => {
  const { data } = await api.get<ApiResponse<ListTransactionsResponse>>("/transactions");
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
};