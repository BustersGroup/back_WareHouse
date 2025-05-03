import { query } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { deleteFileOnError } from "./delete-file-on-error.js"

export const inventoryReportValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "EMPLOYEE_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const movementSummaryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "EMPLOYEE_ROLE"),query('startDate').notEmpty().withMessage('startDate is required').isISO8601().withMessage('startDate must be a valid date'),
    query('endDate').notEmpty().withMessage('endDate is required').isISO8601().withMessage('endDate must be a valid ISO8601 date'),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
