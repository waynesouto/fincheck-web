import { createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { cookiesKeys } from "../utils/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users";
import { authService } from "../services/auth";
import { notification } from "../utils/notification";
import { PageLoader } from "../../view/components/PageLoader";
import { queryClient } from "../../App";
import { IUser } from "../entities";

type AuthContextValue = {
	loggedIn: boolean;
	user?: IUser;
	login(): void;
	logout(): void;
};

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [cookie] = useCookies([cookiesKeys.IS_AUTHENTICATED]);
	const [loggedIn, setLoggedIn] = useState<boolean>(() => {
		const isAuthenticated: boolean | undefined = cookie[cookiesKeys.IS_AUTHENTICATED];

		return !!isAuthenticated;
	});

	const { isError, isFetching, isSuccess, data } = useQuery({
		queryKey: ["users", "me"],
		queryFn: usersService.me,
		enabled: loggedIn,
		staleTime: Infinity,
	});

	const { mutateAsync } = useMutation({
		mutationFn: () => authService.logout(),
	});

	const login = useCallback(() => {
		setLoggedIn(true);
	}, []);

	const logout = useCallback(async () => {
		try {
			await mutateAsync();
		} catch (err) {
			notification(err as string, "error");
		}
		// remove query from cache
		queryClient.removeQueries({ queryKey: ["users", "me"], exact: true });
		setLoggedIn(false);
	}, [mutateAsync]);

	useEffect(() => {
		if (isError) {
			notification("Sua sessão expirou", "error");
			logout();
		}
	}, [isError, logout]);

	if (isFetching) {
		return <PageLoader />;
	}

	return (
		<AuthContext.Provider
			value={{
				loggedIn: isSuccess && loggedIn,
				user: data?.user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
