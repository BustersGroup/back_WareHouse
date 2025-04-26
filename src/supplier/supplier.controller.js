'use strict'

import Supplier from './supplier.model.js'

export const createSupplier = async (req, res) => {
    try {
        const data = req.body;

        const supplier = new Supplier(data);
        await supplier.save();

        res.status(201).json({
            success: true,
            msg: "Supplier created successfully",
            supplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error creating supplier",
            error: error.message 
        });
    }
};


export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({ status: true });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: "Error to find it" });
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier || !supplier.status) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar proveedor" });
    }
};

export const getSupplierByName = async (req, res) => {
    try {
        const { nameSupplier } = req.params;
        const supplier = await Supplier.findOne({ nameSupplier: nameSupplier });

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Supplier fetched successfully",
            supplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching supplier",
            error: error.message
        });
    }
};

export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, ...rest } = req.body; 

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id, rest, { new: true } 
        );

        if (!updatedSupplier) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar proveedor" });
    }
};


export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!supplier) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.status(200).json({ message: "Proveedor desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al desactivar proveedor" });
    }
};