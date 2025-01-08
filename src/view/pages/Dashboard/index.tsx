import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export const Dashboard = () => {
	const { logout } = useAuth();

	return (
		<div>
			<h1>Dashboard page</h1>
			<Button onClick={logout}>Sair</Button>
		</div>
	);
};
