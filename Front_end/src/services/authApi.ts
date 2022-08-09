import API from "./axiosConfig";

import { AxiosError, AxiosResponse } from "axios";
import { IUser, IMessageApi } from "@/interfaces/api.interface";

const config = {
	headers: {
		enctype: "application/x-www-form-urlencoded",
	},
};

export const signInApi = async (user: IUser): Promise<string | IMessageApi> => {
	return await API.post("/signIn", user, config)
		.then((response: AxiosResponse) => {
			return response.data.token;
		})
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};

export const signUpApi = async (
	user: IUser
): Promise<boolean | IMessageApi> => {
	return await API.post("/signUp", user)
		.then(() => true)
		.catch((error: AxiosError) => {
			if (error.response?.data) {
				return error.response.data as IMessageApi;
			} else {
				return { message: "An internal error occurred" };
			}
		});
};
