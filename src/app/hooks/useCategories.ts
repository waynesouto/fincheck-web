import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categories";

export const useCategories = () => {
	const { data, isFetching } = useQuery({
		queryKey: ["categories"],
		queryFn: categoriesService.list,
	});

	return {
		categories: data === undefined ? [] : data.categories,
		isFetching,
	};
};
