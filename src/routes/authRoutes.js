import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.get('/signup', authController.signUp);
authRouter.get('/signin', authController.signIn);
authRouter.get('/signup/verify', authController.verify);

export default authRouter;