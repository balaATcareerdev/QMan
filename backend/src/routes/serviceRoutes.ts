import { Router } from "express";
import {
  createService,
  getActiveServices,
  getServiceStats,
  getUpcomingServices,
  startService,
} from "../controllers/serviceController.js";
import { userAuth } from "../middleware/userAuth.js";

const serviceRouter = Router();

serviceRouter.post("/create", userAuth, createService);

serviceRouter.get("/active", userAuth, getActiveServices);

serviceRouter.get("/stats", userAuth, getServiceStats);

serviceRouter.get("/upcoming", userAuth, getUpcomingServices);

serviceRouter.post("/start/:serviceId", userAuth, startService);

export default serviceRouter;
