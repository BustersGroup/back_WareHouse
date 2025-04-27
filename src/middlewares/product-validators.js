import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { nameProductExists } from "../helpers/db-validators.js"

export const createdProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameProduct").notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").notEmpty().withMessage("Description is required"),
    body("price").isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("nameProduct").custom(nameProductExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getProductByNameValidator = [
    body("nameProduct").custom(nameProductExists),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    body("nameProduct").optional().notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("nameProduct").optional().custom(nameProductExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    validarCampos,
    handleErrors
]