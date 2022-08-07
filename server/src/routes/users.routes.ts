import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller";
import {
	checkSchema_UsersSignIn,
	checkSchema_UsersSignUp,
} from "../middlewares/validator.middleware";

const router = Router();

router.post("/signUp", checkSchema_UsersSignUp, signUp);
router.post("/signIn", checkSchema_UsersSignIn, signIn);
