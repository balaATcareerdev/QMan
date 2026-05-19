import { Router } from "express";
import {
  createService,
  getActiveServices,
  getServiceStats,
  getUpcomingServices,
} from "../controllers/serviceController.js";
import { userAuth } from "../middleware/userAuth.js";

const serviceRouter = Router();

serviceRouter.post("/create", userAuth, createService);

serviceRouter.get("/active", userAuth, getActiveServices);

serviceRouter.get("/stats", userAuth, getServiceStats);

serviceRouter.get("/upcoming", userAuth, getUpcomingServices);

export default serviceRouter;
