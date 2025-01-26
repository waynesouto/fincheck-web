import { EmptyObject } from "../../utils/type";
import { api, ApiResponse } from "../api";

type LogoutResponse = EmptyObject;

export const logout = async () => {
	const { data } = await api.delete<ApiResponse<LogoutResponse>>("/auth/refresh");
	if (data.process === "failed") {
		throw new Error(data.body);
	}

	return data.body;
};
