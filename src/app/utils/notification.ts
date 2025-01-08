import toast from "react-hot-toast";

export const notification = (
  message: string,
  type: "error" | "loading" | "success" = "loading"
) => {
  return toast[type](message);
}
