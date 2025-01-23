import { IBankAccount } from "../../entities";
import { api, ApiResponse } from "../api";

export type UpdateBankAccountParams = {
	id: string
	data: Partial<Pick<
	IBankAccount,
	| 'name'
	| 'color'
	| 'initialBalance'
	| 'isActive'
	| 'type'
>>
}

export type UpdateBankAccountResponse = { bankAccount: IBankAccount }

export const update = async ({id, data}: UpdateBankAccountParams) => {
  const result = await api.patch<ApiResponse<UpdateBankAccountResponse>>(`/bank-accounts/${id}`, data);
	if (result.data.process === 'failed') {
		throw new Error(result.data.body)
	}

  return result.data.body;
};