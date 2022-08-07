import bcrypt from "bcrypt";

export const createBcryptPassword = async (
	password: string
): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const comparePassword = async (
	password: string,
	bcryptPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(password, bcryptPassword);
};
