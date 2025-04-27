'use strict';
import Movement from './movement.model.js';
import Product from '../product/product.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const registerEntry = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: userId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        product.stock += quantity;
        await product.save();

        const movement = new Movement({
            product: product._id,
            type: 'entrada',
            quantity,
            employee: userId,
            date: new Date(),
        });

        await movement.save();

        res.status(201).json({
            message: "Entrada registrada con éxito",
            movement,
            updatedProduct: product
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al registrar la entrada", error: error.message });
    }
};

export const registerExit = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: userId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);
          const { productId, quantity, motive, destination } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente para realizar la salida" });
        }

        product.stock -= quantity;

        await product.save();

        const movement = new Movement({
            product: product._id,
            type: 'salida',
            quantity,
            employee: userId,
            motive,
            destination,
            date: new Date(), 
        });

        await movement.save();

        res.status(201).json({
            message: "Salida registrada con éxito",
            movement,
            updatedProduct: product
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al registrar la salida", error: error.message });
    }
};
export const MovementsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;  

        const movements = await Movement.find({ product: productId })
            .populate('employee', 'name surname')
            .sort({ date: -1 });

        if (movements.length === 0) {
            return res.status(404).json({ message: "No se encontraron movimientos para este producto" });
        }

        res.status(200).json({
            message: "Movimientos obtenidos con éxito",
            movements
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los movimientos", error: error.message });
    }
};
export const Movements = async (req, res) => {
    try {
        const movements = await Movement.find()
            .populate('employee', 'name surname')
            .sort({ date: -1 });

        if (movements.length === 0) {
            return res.status(404).json({ message: "No se encontraron movimientos" });
        }

        res.status(200).json({
            message: "Historial completo de movimientos obtenido con éxito",
            totalMovements: movements.length,
            movements
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el historial de movimientos", error: error.message });
    }
};