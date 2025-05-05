import { Schema, model } from 'mongoose';
/**
 * @swagger
 * components:
 *   schemas:
 *     MovementExit:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: ID del producto asociado a la salida.
 *           example: "60d21b4667d0d8992e610c85"
 *         quantity:
 *           type: integer
 *           description: Cantidad de producto retirado.
 *           example: 5
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la salida.
 *           example: "2025-05-03T12:00:00Z"
 *         employee:
 *           type: string
 *           description: ID del empleado que registró la salida.
 *           example: "60d21b4667d0d8992e610c86"
 *         client:
 *           type: string
 *           description: ID del cliente asociado a la salida.
 *           example: "60d21b4667d0d8992e610c87"
 *         motive:
 *           type: string
 *           description: Motivo de la salida.
 *           example: "Venta"
 *         destination:
 *           type: string
 *           description: Destino del producto.
 *           example: "Sucursal B"
 */

const movementExitSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client', 
        required: true,
    },
    motive: {
        type: String, 
    },
    destination: {
        type: String, 
        required: true,

    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('MovementExit', movementExitSchema);