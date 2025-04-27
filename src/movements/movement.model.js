import { Schema, model } from 'mongoose';

const movementSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  
        required: true,
    },
    type: {
        type: String,
        enum: ['entrada', 'salida'],
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
    },
    destination: {
        type: String,  
    }
});

export default model('Movement', movementSchema);
