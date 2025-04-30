import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/view/layouts/auth-layout";
import { Home } from "@/view/pages/Home";
import { Login } from "@/view/pages/Auth/Login";
import { Register } from "@/view/pages/Auth/Register";
import { AuthGuard } from "@/routes/auth-guard";
import { DashboardLayout } from "@/view/layouts/dashboard-layout";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
				</Route>

				<Route element={<AuthGuard isPrivate />}>
					<Route path="/" element={<DashboardLayout />}>
						<Route index element={<Home />} />
						<Route path="/categories" />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
