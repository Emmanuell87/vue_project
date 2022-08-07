import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import jwtSecret from "../config/jwt.config";
import { connect } from "../database";
import { IUser } from "../interface/users.interface";

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
	const db = await connect();
	db.query("SELECT * FROM users WHERE email = ?", payload.email)
		.then(([rows]) => {
			const user: IUser = JSON.parse(JSON.stringify(rows))[0];

			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch((error) => {
			console.log(error);
		});
});
