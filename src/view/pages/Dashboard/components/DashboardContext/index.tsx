import { createContext, useCallback, useState } from "react";

type DashboardContextValue = {
	areValuesVisible: boolean;
	toggleValuesVisibility(): void;
};

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		return localStorage.getItem("@fincheck-are-values-visible") === "true";
	});

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => {
			const value = !prevState;
			localStorage.setItem("@fincheck-are-values-visible", value.toString());

			return value;
		});
	}, []);

	return (
		<DashboardContext.Provider
			value={{ areValuesVisible, toggleValuesVisibility }}
		>
			{children}
		</DashboardContext.Provider>
	);
};
