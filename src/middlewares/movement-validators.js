import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { deleteFileOnError } from "./delete-file-on-error.js"

export const posEntranceValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","EMPLOYEE_ROLE"),
    body("quantity").isDecimal({min: 0}).withMessage("Quantity must not be less than 0"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const posExitsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","EMPLOYEE_ROLE"),
    body("quantity").isDecimal({min: 0}).withMessage("Quantity must not be less than 0"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getListClientMovements = [
    validateJWT,
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getLisEmployeeMovementsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","EMPLOYEE_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getLisHistory = [
    validateJWT,
    hasRoles("ADMIN_ROLE","EMPLOYEE_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
