import { Router } from "express";
import {registerEntry,registerExit,MovementsByProduct, Movements} from "./movement.controller.js";
import {posEntranceValidator, posExitsValidator, getListMovementValidator, getLisValidator} from "../middlewares/movement-validators.js";

const router = Router();

router.post("/registerMotion", posEntranceValidator, registerEntry);

router.post("/registerMotionExit", posExitsValidator, registerExit);

router.get("/Movements/:productId", getListMovementValidator, MovementsByProduct);

router.get("/Movements", getLisValidator, Movements);

export default router;