import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { AuthProvider } from "@/app/contexts/auth-context";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/app/contexts/theme-context";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export const App = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Router />
						<Toaster />
					</AuthProvider>

					<ReactQueryDevtools buttonPosition="bottom-right" />
				</QueryClientProvider>
			</CookiesProvider>
		</ThemeProvider>
	);
};
