import API from "./axiosConfig";

import { AxiosError, AxiosResponse } from "axios";
import { IMessageApi } from "@/interface/api.interface";
import { IUserCrypto } from "@/interface/userCrypto.interface";

const config = (token: string) => {
	return {
		headers: {
			enctype: "application/x-www-form-urlencoded",
			Authorization: `Bearer ${token}`,
		},
	};
};

export const getUserCryptos = async (
	token: string
): Promise<IUserCrypto[] | IMessageApi> => {
	return API.get("/userCryptos", config(token))
		.then((response: AxiosResponse) => response.data)
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};

export const newUserCrypto = async (
	token: string,
	data: IUserCrypto
): Promise<IMessageApi> => {
	return API.post("/userCryptos", data, config(token))
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
	token: string,
	idUserCrypto: number
): Promise<IMessageApi> => {
	return API.post(`/userCryptos/${idUserCrypto}`, config(token))
		.then((response: AxiosResponse) => response.data as IMessageApi)
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};
