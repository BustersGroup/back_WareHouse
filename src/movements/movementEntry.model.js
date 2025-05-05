import { Schema, model } from 'mongoose';
/**
 * @swagger
 * components:
 *   schemas:
 *     MovementEntry:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: ID del producto asociado a la entrada.
 *           example: "60d21b4667d0d8992e610c85"
 *         quantity:
 *           type: integer
 *           description: Cantidad de producto ingresado.
 *           example: 10
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la entrada.
 *           example: "2025-05-03T10:00:00Z"
 *         employee:
 *           type: string
 *           description: ID del empleado que registró la entrada.
 *           example: "60d21b4667d0d8992e610c86"
 *         motive:
 *           type: string
 *           description: Motivo de la entrada.
 *           example: "Registro de entrada de producto"
 */
const movementEntrySchema = new Schema({
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
    motive: {
        type: String,  
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('MovementEntry', movementEntrySchema);
