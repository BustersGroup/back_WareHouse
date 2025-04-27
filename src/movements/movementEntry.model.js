import { Schema, model } from 'mongoose';

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
