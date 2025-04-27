import { Router } from "express";

const router = Router();

// Define tus rutas aquí
router.post("/registerProduct", (req, res) => {
    res.send("Producto registrado");
});

router.get("/products", (req, res) => {
    res.send("Lista de productos");
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para la gestión de productos
 */

/**
 * @swagger
 * /backWarehouse/v1/product/registerProduct:
 *   post:
 *     summary: Registrar un producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               imageProduct:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto registrado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/product/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos.
 */

/**
 * @swagger
 * /backWarehouse/v1/product/findProduct/{nameProduct}:
 *   get:
 *     summary: Buscar un producto por nombre
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: nameProduct
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado.
 */

/**
 * @swagger
 * /backWarehouse/v1/product/updateProduct/{uid}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: uid
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
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado.
 */

/**
 * @swagger
 * /backWarehouse/v1/product/deleteProduct/{uid}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado.
 */