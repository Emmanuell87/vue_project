import { Handler } from "express";
import { connect } from "../database";
import { ICrypto } from "../interface/cryptos.interface";
import { IUser } from "../interface/users.interface";
import infoCryptos from "../infoCrypto.json";

export const getUserCryptos: Handler = async (req, res) => {
	const user = req.user as IUser;
	const db = await connect();
	db.query("SELECT * FROM userCryptos WHERE assignedToUser= ?", user.email)
		.then(([userCryptos]) => {
			res.status(200).json(userCryptos);
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

export const getInfoCryptos: Handler = async (req, res) => {
	res.status(200).json(infoCryptos);
};

export const newUserCrypto: Handler = async (req, res) => {
	const user = req.user as IUser;
	const newCrypto: ICrypto = {
		cid: req.body.cid,
		assignedToUser: user.email,
		symbol: req.body.symbol,
		base: req.body.base,
		quote: req.body.quote,
		name: req.body.name,
	};
	const db = await connect();
	db.query(
		"INSERT INTO userCryptos (cid, assignedToUser, symbol, base, quote, name) VALUES (?, ?, ?, ?, ?, ?)",

		Object.values(newCrypto)
	)
		.then(() => {
			res.status(200).json({
				message: "Ok",
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

export const deleteUserCrypto: Handler = async (req, res) => {
	const idUserCrypto = req.params.id;
	const user = req.user as IUser;
	const db = await connect();
	db.query("DELETE FROM userCryptos WHERE id = ? and assignedToUser = ?", [
		idUserCrypto,
		user.email,
	])
		.then(() => {
			res.status(200).json({
				message: "Ok",
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
