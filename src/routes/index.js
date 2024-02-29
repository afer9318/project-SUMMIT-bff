import { Router } from "express";

import AuthRouter from "./authRoutes.js";

const router = Router();

// Auth route
router.use('/auth', AuthRouter);

export default router;