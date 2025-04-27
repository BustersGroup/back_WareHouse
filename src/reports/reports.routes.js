import { Router } from "express"
import { getInventoryReport, getMovementSummary } from "./reports.controller.js"
import { inventoryReportValidator, movementSummaryValidator } from "../middlewares/reports-validator.js"

const router = Router()

router.get("/inventory", inventoryReportValidator, getInventoryReport)
router.get("/movementsSummary", movementSummaryValidator, getMovementSummary)

export default router
