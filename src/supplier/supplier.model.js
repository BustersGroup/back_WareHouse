import { Schema, model } from 'mongoose';

const supplierSchema = new Schema({
    nameSupplier:{
        type: String,
        required: [true, "Name supplier is required"],
        maxLength: [50, "Name supplier cannot exceed 60 characters"]
    },
    contactSupplier:{
        type: Number,
        required: true,
        maxLength: 10
    },
    emailSupplier:{
        type: String,
        required: [true, "Email supplier is required"],
        maxLength: [50, "Email supplier cannot exceed 50 characters"]
    },
    product: {
        type: String,
        required: [true, "Product is required"],
    },
    status: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Supplier', supplierSchema);