import { useContext } from "react";
import { HomeContext } from ".";

export const useHome = () => {
	return useContext(HomeContext);
};
