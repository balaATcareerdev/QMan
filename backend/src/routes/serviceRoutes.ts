import { Router } from "express";
import {
  createService,
  getActiveServices,
  getServiceStats,
  getUpcomingServices,
  activateService,
} from "../controllers/serviceController.js";
import { userAuth } from "../middleware/userAuth.js";
import {
  roleValidate,
  validate,
  validateParamId,
} from "../middleware/validate.js";
import {
  createServiceSchema,
  serviceIdSchema,
} from "../validation/serviceValidation.js";

const serviceRouter = Router();

serviceRouter.post(
  "/create",
  userAuth,
  roleValidate("Client"),
  validate(createServiceSchema),
  createService,
);

serviceRouter.get(
  "/active",
  userAuth,
  roleValidate("Client"),
  getActiveServices,
);

serviceRouter.get("/stats", userAuth, roleValidate("Client"), getServiceStats);

serviceRouter.get(
  "/upcoming",
  userAuth,
  roleValidate("Client"),
  getUpcomingServices,
);

serviceRouter.post(
  "/activate/:serviceId",
  userAuth,
  roleValidate("Client"),
  validateParamId(serviceIdSchema),
  activateService,
);

export default serviceRouter;
