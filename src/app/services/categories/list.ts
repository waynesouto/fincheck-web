import { ICategory } from "../../entities";
import { api, ApiResponse } from "../api";

export type ListCategoriesResponse = {
	categories: ICategory[];
};

export const list = async () => {
	const { data } = await api.get<ApiResponse<ListCategoriesResponse>>("/categories");
	if (data.process === "failed") {
		throw new Error(data.body);
	}

	return data.body;
};
