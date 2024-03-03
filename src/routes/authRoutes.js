import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/signup/verify', authController.verifySignUp);
authRouter.post('/signin', authController.signIn);

export default authRouter;