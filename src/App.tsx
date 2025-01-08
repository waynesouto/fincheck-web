import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { AuthProvider } from "./app/contexts/AuthProvider";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export function App() {
	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Router />
					<Toaster />
				</AuthProvider>

				<ReactQueryDevtools />
			</QueryClientProvider>
		</CookiesProvider>
	);
}
