import { Router } from "express";

const router = Router();

// Define tus rutas aquí
router.post("/register", (req, res) => {
    res.send("Proveedor registrado");
});

router.get("/", (req, res) => {
    res.send("Lista de proveedores");
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Endpoints para la gestión de proveedores
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier/register:
 *   post:
 *     summary: Registrar un proveedor
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor registrado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Lista de proveedores.
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proveedor encontrado.
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier/find/{nameSupplier}:
 *   get:
 *     summary: Buscar un proveedor por nombre
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: nameSupplier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proveedor encontrado.
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier/updateSupplier/{id}:
 *   put:
 *     summary: Actualizar un proveedor
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado.
 */

/**
 * @swagger
 * /backWarehouse/v1/supplier/deleteSupplier/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proveedor eliminado.
 */