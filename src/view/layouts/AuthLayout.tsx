import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Canvas } from "@react-three/fiber";
import { Blob } from "@/view/components/blob";

export const AuthLayout = () => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Logo className="text-gray-500 h-6" />
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<Outlet />
					</div>
				</div>
			</div>

			<div className="relative hidden lg:block">
				<Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
					<Blob />
				</Canvas>
			</div>
		</div>
	);
};
