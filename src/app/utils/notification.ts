import toast from "react-hot-toast";

export const notification = (message: string, type: "error" | "loading" | "success" = "success") => {
	return toast[type](message);
};
