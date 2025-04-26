'use strict';

import Product from './product.model.js';
import Supplier from '../supplier/supplier.model.js';

export const addProduct = async (req, res) => {
    try {
        const data = req.body;
        const supplier = await Supplier.findOne({supplier : data.supplier});
        let imageProduct = req.file ? req.file.filename : null;
        data.imageProduct = imageProduct

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            })
        }

        const product = new Product({
            ...data,
            supplier: supplier._id,
        })

        await product.save();

        res.status(201).json({
            success: true,
            msg: "Product created successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true }).populate('supplier', 'nameSupplier -_id')
            .sort({ entryDate: -1 });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            total: products.length,
            products
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        })
    }
}

export const getProductbyName = async (req, res) => {
    try {
        const { nameProduct } = req.params;
        const product = await Product.findOne({ nameProduct: nameProduct }).populate('supplier', 'nameSupplier -_id')

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message
        })
    }
}

export const getProductbyCategory = async (req, res) => {   
    try {
        const { category } = req.params;
        const products = await Product.find({ category: category }).populate('supplier', 'nameSupplier -_id')
    
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            total: products.length,
            products
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        })
    }
}

export const getProductbyEntryDate = async (req, res) => {
    try {
        const { entryDate } = req.params;
        const parsedDate = new Date(entryDate).populate('supplier', 'nameSupplier -_id')

        if (isNaN(parsedDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));  

        const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999)); 

        const products = await Product.find({
            entryDate: { $gte: startOfDay, $lte: endOfDay }
        });


        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            total: products.length,
            products
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { uid } = req.params;
        const { ...data} = req.body;

        const product = await Product.findByIdAndUpdate(uid, data, {new: true});
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            product
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const { confirm } = req.body;

        if (confirm !== 'true') {
            return res.status(400).json({
                success: false,
                message: 'Se requiere confirmación para eliminar el producto.'
            });
        }

        const product = await Product.findByIdAndDelete(uid);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente.',
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};
