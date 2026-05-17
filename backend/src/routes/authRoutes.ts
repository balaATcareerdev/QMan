import { Router } from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/is-auth", userAuth, isAuth);

export default authRouter;
