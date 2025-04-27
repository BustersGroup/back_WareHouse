import { body, param } from "express-validator";
import { emailSupplierExists, contactSupplierExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

export const createSupplierValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameSupplier").notEmpty().withMessage("El nombre del proveedor es requerido").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("contactSupplier").notEmpty().withMessage("El contacto es requerido").isLength({ max: 50 }).withMessage("El contacto debe tener 10 dígitos").custom(contactSupplierExists).withMessage("El contacto ya está registrado"),
    body("emailSupplier").notEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido").custom(emailSupplierExists).withMessage("El email ya está registrado"),
    body("product").notEmpty().withMessage("El producto es requerido"),
    validarCampos,
];

export const getSupplierByNameValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("nameSupplier").notEmpty().withMessage("El nombre del proveedor es requerido"),
    validarCampos,
];

export const updateSupplierValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido"),
    body("nameSupplier").optional().notEmpty().withMessage("El nombre del proveedor es requerido").isLength({ max: 50 }).withMessage("El nombre no puede exceder los 50 caracteres"),
    body("contactSupplier").optional().notEmpty().withMessage("El contacto es requerido").isLength({ max: 50 }).withMessage("El contacto debe tener 10 dígitos"),
    body("emailSupplier").optional().notEmpty().withMessage("El email es requerido").isEmail().withMessage("El email no es válido"),
    body("product").optional().notEmpty().withMessage("El producto es requerido"),
    validarCampos,
];

export const deleteSupplierValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido"),
    validarCampos,
];