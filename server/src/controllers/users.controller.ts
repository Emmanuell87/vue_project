import { Handler } from "express";
import { connect } from "../database";
import { IUser } from "../interface/users.interface";
import { createToken } from "../services/token.services";

export const signUp: Handler = async (req, res) => {
	const user: IUser = {
		email: req.body.email,
		password: req.body.password,
	};
	const db = await connect();
	db.query(
		"INSERT INTO users (email, password) VALUES (?, ?)",
		Object.values(user)
	)
		.then(() => {
			res.status(200).json({
				message: "Usuario creado",
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: "An error occurred",
				error,
			});
		})
		.then(() => {
			db.end();
		});
};

export const signIn: Handler = async (req, res) => {
	const user: IUser = {
		email: req.body.email,
		password: req.body.password,
	};

	res.status(200).json({ token: createToken(user) });
};
