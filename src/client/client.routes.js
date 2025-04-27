import { Router } from "express";

const router = Router();

// Define tus rutas aquí
router.post("/registerClient", (req, res) => {
    res.send("Cliente registrado");
});

router.get("/clients", (req, res) => {
    res.send("Lista de clientes");
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints para la gestión de clientes
 */

/**
 * @swagger
 * /backWarehouse/v1/client/registerClient:
 *   post:
 *     summary: Registrar un cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente registrado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/client/clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes.
 */