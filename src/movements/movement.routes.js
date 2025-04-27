import { Router } from "express";

const router = Router();

// Define tus rutas aquí
router.post("/registerMotion", (req, res) => {
    res.send("Movimiento registrado");
});

router.get("/Movements", (req, res) => {
    res.send("Lista de movimientos");
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Endpoints para la gestión de movimientos
 */

/**
 * @swagger
 * /backWarehouse/v1/movement/registerMotion:
 *   post:
 *     summary: Registrar una entrada de movimiento
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Movimiento registrado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/movement/Movements:
 *   get:
 *     summary: Obtener todos los movimientos
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: Lista de movimientos.
 */