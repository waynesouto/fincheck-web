import { IBankAccount } from "../../entities";
import { CustomOmit } from "../../utils/type";
import { api, ApiResponse } from "../api";

export type CreateBankAccountParams = CustomOmit<
	IBankAccount,
	"id" | "userId" | "createdAt" | "updatedAt" | "isActive"
>;

export type CreateBankAccountResponse = { bankAccount: IBankAccount };

export const create = async (params: CreateBankAccountParams) => {
	const { data } = await api.post<ApiResponse<CreateBankAccountResponse>>("/bank-accounts", params);
	if (data.process === "failed") {
		throw new Error(data.body);
	}

	return data.body;
};
