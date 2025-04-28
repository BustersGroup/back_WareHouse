import { body, param } from "express-validator";
import { nameClientExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

export const createClientValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameClient").notEmpty().withMessage("El nombre del proveedor es requerido").withMessage("El nombre no puede exceder los 50 caracteres"),
    body("emailClient").notEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido"),
    body("contactClient").notEmpty().withMessage("El contacto es requerido").withMessage("El contacto debe tener 8 dígitos"),
    validarCampos,
];

export const getClientsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
];

export const updateClientValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido"),
    body("nameClient").optional().notEmpty().withMessage("El nombre del proveedor es requerido").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("contactClient").optional().notEmpty().withMessage("El contacto es requerido").isLength({ min: 10, max: 10 }).withMessage("El contacto debe tener 10 dígitos"),
    body("emailClient").optional().notEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido"),
    validarCampos,
];

export const deleteClientValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido"),
    validarCampos,
];
