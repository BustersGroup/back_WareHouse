import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    nameProduct:{
        type: String,
        required: [true, "Name product is required"],
        maxLength: [60, "Name product cannot exceed 60 characters"]
    },
    descriptionProduct:{
        type: String,
        required: [true, "Description product is required"],
        maxLength: [200, "Description product cannot exceed 200 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be less than 0"],
    },
    category:{
        type: String,
        required: [true, "Category is required"],
    },
    imageProduct:{
        type:String
    },
    sales: {
        type: Number,
        default: 0
    },
    entryDate: {
        type: Date,
        default: Date.now
    },
    supplier: {
        type: String,
        required: [true, "Supplier is required"],
    },
    status: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);