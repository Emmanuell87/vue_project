import { Request, Response, NextFunction } from "express";
import {
	validationResult,
	ValidationChain,
	checkSchema,
	ValidationError,
} from "express-validator";
import { connect } from "../database";
import {
	createBcryptPassword,
	comparePassword,
} from "../services/bcrypt.services";

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (let validation of validations) {
			const result = await validation.run(req);
			if (result.errors.length) break;
		}

		const errorFormatter = ({
			location,
			msg,
			param,
			value,
			nestedErrors,
		}: ValidationError) => {
			// Build your resulting errors however you want! String, object, whatever - it works!
			return `${msg}`;
		};

		const errors = validationResult(req).formatWith(errorFormatter);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(400).json({ message: errors.array()[0] });
	};
};

export const checkSchema_UsersSignUp = validate([
	...checkSchema({
		email: {
			trim: true,
			isEmpty: {
				errorMessage: "Por favor envíe el email",
				negated: true,
			},

			isEmail: {
				errorMessage: "Por favor envíe un email valido",
				bail: true,
			},
			custom: {
				options: async (value) => {
					const db = await connect();
					const user = await db
						.query("SELECT * FROM users WHERE email = ?", [value])
						.then(([rows]) => JSON.parse(JSON.stringify(rows)))
						.catch((error) => {
							console.log(error);
						});

					db.end();

					if (user.length > 0) {
						return Promise.reject("Email ya está en uso");
					}
				},
			},
		},
		password: {
			isLength: {
				errorMessage: "La contraseña debe tener al menos 8 caracteres",
				options: { min: 8 },
			},
			custom: {
				options: (value) => {
					return value.replace(/\s*/g, "");
				},
			},

			customSanitizer: {
				options: async (value) => {
					return await createBcryptPassword(value);
				},
			},
		},
	}),
]);

export const checkSchema_UsersSignIn = validate([
	...checkSchema({
		email: {
			trim: true,
			isEmpty: {
				errorMessage: "Por favor envíe el email",
				negated: true,
			},

			isEmail: {
				errorMessage: "Por favor envíe un email valido",
				bail: true,
			},
			custom: {
				options: async (value) => {
					const db = await connect();
					const user = await db
						.query("SELECT * FROM users WHERE email = ?", [value])
						.then(([rows]) => JSON.parse(JSON.stringify(rows)))
						.catch((error) => {
							console.log(error);
						});

					db.end();

					if (user.length == 0) {
						return Promise.reject(
							"No se encontró una cuenta con el email especificado"
						);
					}
				},
			},
		},
		password: {
			isLength: {
				errorMessage: "La contraseña debe tener al menos 8 caracteres",
				options: { min: 8 },
			},
			custom: {
				options: async (value, { req }) => {
					const db = await connect();
					const [user] = await db
						.query("SELECT * FROM users WHERE email = ?", [
							req.body.email,
						])
						.then(([rows]) => JSON.parse(JSON.stringify(rows)))
						.catch((error) => {
							console.log(error);
						});

					if (!(await comparePassword(value, user.password))) {
						return Promise.reject("Contraseña incorrecta");
					}
				},
			},
		},
	}),
]);

export const checkSchema_userCrypto = validate([
	...checkSchema({
		cid: {
			isEmpty: {
				errorMessage: "Por favor envíe el cid de la cryptomoneda",
				negated: true,
			},
			isInt: {
				errorMessage: "El cid debe ser un entero",
			},
			toInt: true,
		},
		symbol: {
			isEmpty: {
				errorMessage: "Por favor envíe el symbol de la cryptomoneda",
				negated: true,
			},
		},
		base: {
			isEmpty: {
				errorMessage: "Por favor envíe la base de la cryptomoneda",
				negated: true,
			},
		},
		quote: {
			isEmpty: {
				errorMessage: "Por favor envíe la quote de la cryptomoneda",
				negated: true,
			},
		},
		name: {
			isEmpty: {
				errorMessage: "Por favor envíe el name de la cryptomoneda",
				negated: true,
			},
		},
	}),
]);
