import { Router } from "express";
import {
	getUserCryptos,
	newUserCrypto,
	deleteUserCrypto,
} from "../controllers/cryptos.controller";
import passport from "passport";
import { checkSchema_userCrypto } from "../middlewares/validator.middleware";

const router = Router();

router.get(
	"/userCryptos",
	passport.authenticate("jwt", { session: false }),
	getUserCryptos
);

router.post(
	"/userCryptos",
	passport.authenticate("jwt", { session: false }),
	checkSchema_userCrypto,
	newUserCrypto
);

router.delete(
	"/userCryptos/:id",
	passport.authenticate("jwt", { session: false }),
	deleteUserCrypto
);

export default router;
