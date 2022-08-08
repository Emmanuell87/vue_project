import API from "./axiosConfig";

import { AxiosError, AxiosResponse } from "axios";
import { IMessageApi } from "@/interfaces/api.interface";
import { IUserCrypto } from "@/interfaces/userCrypto.interface";
import store from "../store";

const config = {
	headers: {
		enctype: "application/x-www-form-urlencoded",
		Authorization: `Bearer ${store.state.token}`,
	},
};

export const getUserCryptos = async (): Promise<
	AxiosResponse<IUserCrypto[]>
> => {
	return API.get("/userCryptos", config);
	// .then((response: AxiosResponse) => response.data)
	// .catch((error: AxiosError) => {
	// 	if (error.response?.data) {
	// 		console.log(error.response.data as IMessageApi);
	// 	} else {
	// 		console.log({ message: "An internal error occurred" });
	// 	}

	// 	return [];
	// });
};

export const newUserCrypto = async (
	data: IUserCrypto
): Promise<IMessageApi> => {
	return API.post("/userCryptos", data, config)
		.then((response: AxiosResponse) => response.data as IMessageApi)
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};

export const deleteUserCrypto = async (
	idUserCrypto: number
): Promise<IMessageApi> => {
	return API.delete(`/userCryptos/${idUserCrypto}`, config)
		.then((response: AxiosResponse) => response.data as IMessageApi)
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};
