import { Router } from "express";
import {registerEntry,registerExit, EmployeeMovements, ProductAllMovements} from "./movement.controller.js";
import {posEntranceValidator, posExitsValidator, getLisEmployeeMovementsValidator, getLisHistory  } from "../middlewares/movement-validators.js";

const router = Router();

router.post("/movement/entry", posEntranceValidator, registerEntry);

router.post("/movement/exit", posExitsValidator, registerExit);

router.get("/movement/employee", getLisEmployeeMovementsValidator, EmployeeMovements);

router.get("/movement/product/:productId/history", getLisHistory, ProductAllMovements);


export default router;