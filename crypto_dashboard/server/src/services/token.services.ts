import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.config";
import { IUser } from "../interface/users.interface";

export const createToken = (user: IUser): string => {
	return jwt.sign({ email: user.email }, jwtSecret);
};
