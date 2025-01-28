import { EmptyObject } from "../../utils/type";
import { api, ApiResponse } from "../api";

type RefreshResponse = EmptyObject;

export const refresh = async () => {
	const { data } = await api.post<ApiResponse<RefreshResponse>>("/auth/refresh");
	if (data.process === "failed") {
		throw new Error(data.body);
	}

	return data.body;
};
