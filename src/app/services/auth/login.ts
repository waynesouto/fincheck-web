import { sleep } from "../../utils/sleep";
import { EmptyObject } from "../../utils/type";
import { api, ApiResponse } from "../api";

export type LoginParams = {
  email: string;
  password: string;
}

type LoginResponse = EmptyObject

export const login = async(params: LoginParams) => {
  await sleep();

  const { data } = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    params
  );
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
}
