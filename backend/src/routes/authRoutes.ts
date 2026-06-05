import { Router } from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validation/credValidation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", userAuth, logout);
authRouter.get("/is-auth", userAuth, isAuth);

export default authRouter;
