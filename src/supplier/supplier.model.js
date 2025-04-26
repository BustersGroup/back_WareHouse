import { Schema, model } from 'mongoose';

const supplierSchema = new Schema({
    nameSupplier:{
        type: String,
        required: [true, "Name supplier is required"],
    },
    contactSupplier:{
        type: String,
        required: true,
    },
    emailSupplier:{
        type: String,
        required: [true, "Email supplier is required"],
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