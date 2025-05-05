import { Router } from "express";
import {registerEntry,registerExit, ListEntries, ListExit} from "./movement.controller.js";
import {posEntranceValidator, posExitsValidator, getLisEmployeeMovementsValidator, getLisHistory  } from "../middlewares/movement-validators.js";

const router = Router();

router.post("/movement/entry", posEntranceValidator, registerEntry);

router.post("/movement/exit", posExitsValidator, registerExit);

router.get("/entryList", getLisEmployeeMovementsValidator, ListEntries);

router.get("/exitsList", getLisHistory, ListExit);


export default router;

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Endpoints para gestionar movimientos de productos.
 */

/**
 * @swagger
 * /movement/entry:
 *   post:
 *     summary: Registrar entrada de producto
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameProduct:
 *                 type: string
 *                 example: "Producto A"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Entrada registrada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovementEntry'
 *       404:
 *         description: Producto no encontrado con ese nombre.
 *       500:
 *         description: Error al registrar la entrada.
 */

/**
 * @swagger
 * /entryList:
 *   get:
 *     summary: Listar entradas
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: Historial completo de entradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovementEntry'
 *       500:
 *         description: Error al obtener entradas.
 */

/**
 * @swagger
 * /movement/exit:
 *   post:
 *     summary: Registrar salida de producto
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameProduct:
 *                 type: string
 *                 example: "Producto A"
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               motive:
 *                 type: string
 *                 example: "Venta"
 *               destination:
 *                 type: string
 *                 example: "Sucursal B"
 *               emailClient:
 *                 type: string
 *                 example: "cliente@example.com"
 *     responses:
 *       201:
 *         description: Salida registrada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovementExit'
 *       404:
 *         description: Producto o cliente no encontrado.
 *       400:
 *         description: Stock insuficiente para realizar la salida.
 *       500:
 *         description: Error al registrar la salida.
 */

/**
 * @swagger
 * /exitsList:
 *   get:
 *     summary: Listar salidas
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: Historial completo de salidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovementExit'
 *       500:
 *         description: Error al obtener salidas.
 */
