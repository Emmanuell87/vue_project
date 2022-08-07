import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
