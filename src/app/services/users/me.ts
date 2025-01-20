import { IUser } from "../../entities";
import { api, ApiResponse } from "../api";

type MeResponse = {
	user: IUser
}

export const me = async () => {
  const { data } = await api.get<ApiResponse<MeResponse>>("/users/me");
	if (data.process === 'failed') {
		throw new Error(data.body)
	}

  return data.body;
};