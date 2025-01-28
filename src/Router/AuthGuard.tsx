import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

type AuthGuardProps = {
	isPrivate: boolean;
};

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
	const { loggedIn } = useAuth();

	if (!loggedIn && isPrivate) {
		return <Navigate to="/login" replace />;
	}

	if (loggedIn && !isPrivate) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
