import { IBankAccount } from "../../entities";
import { api, ApiResponse } from "../api";

export type ListBankAccountsResponse = {
	bankAccounts: Array<{
	currentBalance: number
} & IBankAccount>
}

export const list = async () => {
  const { data } = await api.get<ApiResponse<ListBankAccountsResponse>>("/bank-accounts");
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
};