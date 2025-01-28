import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error.response?.data?.body ?? "Erro desconhecido");
	},
);

export type ApiResponse<T> =
	| {
			process: "success";
			body: T;
	  }
	| {
			process: "failed";
			body: string;
	  };

// export const apiInterceptor = (api_instance: AxiosInstance) => {
//   return api_instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const { response, config } = error

//       if (
//         response.status !== 401 &&
//         (response.data.body !== "Refresh token not found" ||
//           response.data.body !== "Unauthorized refresh token")
//       ) {
//         return Promise.reject(error)
//       }

//       try {
//         const accessTokenResponse = await getAccessToken()

//         if (!accessTokenResponse.error) {
//           return axios(config)
//         } else {
//           throw new Error("Failed to obtain access token")
//         }
//       } catch (error) {
//         return Promise.reject(error)
//       }
//     }
//   )
// }

export { api };
