import { sleep } from "../../utils/sleep";
import { EmptyObject } from "../../utils/type";
import { api, ApiResponse } from "../api";

export type RegisterParams = {
	email: string;
	password: string;
};

type RegisterResponse = EmptyObject;

export const register = async (params: RegisterParams) => {
	await sleep();

	const { data } = await api.post<ApiResponse<RegisterResponse>>("/auth/register", params);
	if (data.process === "failed") {
		throw new Error(data.body);
	}

	return data.body;
};
