import API from "./axiosConfig";

import { AxiosError, AxiosResponse, AxiosProxyConfig } from "axios";
import { IMessageApi } from "@/interfaces/api.interface";
import { IUserCrypto } from "@/interfaces/userCrypto.interface";
import store from "../store";
import { TInfoCryptos } from "@/interfaces/infoCryptos";

const token = localStorage.getItem("token");

const config = (token: string) => {
	return {
		headers: {
			enctype: "application/x-www-form-urlencoded",
			Authorization: `Bearer ${token}`,
		},
	};
};

export const getUserCryptos = async (): Promise<
	AxiosResponse<IUserCrypto[]>
> => {
	return API.get("/userCryptos", config(store.state.token as string));
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

export const getInfoCryptos = async (): Promise<
	AxiosResponse<TInfoCryptos>
> => {
	return API.get("/infoCryptos", config(store.state.token as string));
};

export const newUserCrypto = async (
	data: IUserCrypto
): Promise<AxiosResponse<IMessageApi>> => {
	return API.post("/userCryptos", data, config(store.state.token as string));
};

export const deleteUserCrypto = async (
	idUserCrypto: number
): Promise<AxiosResponse<IMessageApi>> => {
	return API.delete(
		`/userCryptos/${idUserCrypto}`,
		config(store.state.token as string)
	);
};
