'use strict';
import MovementEntry  from './movementEntry.model.js';
import MovementExit from './movementExit.model.js';
import Product from '../product/product.model.js';
import Client from '../client/client.model.js';
import jwt from 'jsonwebtoken';


export const registerEntry = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: userId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId).populate('supplier', 'nameSupplier');
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        product.stock += quantity;
        await product.save();

        const movement = new MovementEntry({
            product: product._id,
            quantity,
            employee: userId,
            motive: "Registro de entrada de producto",
            date: new Date()
        });

        await movement.save();

        res.status(201).json({
            message: "Entrada registrada con éxito",
            entry: {
                date: movement.date,
                quantity: movement.quantity,
                employee: userId,
                supplier: {
                    _id: product.supplier._id,
                    nameSupplier: product.supplier.nameSupplier
                }
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar la entrada", error: error.message });
    }
};

export const registerExit = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: employeeId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

        const { productId, quantity, motive, destination, clientId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const client = await Client.findById(clientId).select("name");
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente para realizar la salida" });
        }

        product.stock -= quantity;
        product.sales += quantity;
        await product.save();

        const movementExit = new MovementExit({
            product: product._id,
            client: clientId,
            employee: employeeId, 
            quantity,
            motive,
            destination,
            date: new Date()
        });

        await movementExit.save();

        res.status(201).json({
            message: "Salida registrada con éxito",
            exit: {
                date: movementExit.date,
                quantity: movementExit.quantity,
                clientName: client.name, 
                motive: movementExit.motive,
                destination: movementExit.destination
            },
            updatedProduct: {
                stock: product.stock,
                sales: product.sales
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar la salida", error: error.message });
    }
};


export const EmployeeMovements = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: employeeId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

        const { userId } = req.query;  

        let entries;
        let exits;

        if (userId) {
            entries = await MovementEntry.find({ employee: employeeId, client: userId })
                .populate('product', 'nameProduct')
                .sort({ date: -1 });
            
            exits = await MovementExit.find({ employee: employeeId, client: userId })
                .populate('product', 'nameProduct')
                .sort({ date: -1 });
        } else {
            entries = await MovementEntry.find({ employee: employeeId })
                .populate('product', 'nameProduct')
                .sort({ date: -1 });
            
            exits = await MovementExit.find({ employee: employeeId })
                .populate('product', 'nameProduct')
                .sort({ date: -1 });
        }

        res.status(200).json({
            message: "Historial de movimientos del empleado (entrada y salida)",
            entries,
            exits
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los movimientos del empleado", error: error.message });
    }
};

export const ProductAllMovements = async (req, res) => {
    try {
        const { productId } = req.params;

        const entries = await MovementEntry.find({ product: productId })
            .populate('employee', 'name')
            .sort({ date: -1 });

        const exits = await MovementExit.find({ product: productId })
            .populate('client', 'name')
            .sort({ date: -1 });

        res.status(200).json({
            message: "Historial completo del producto",
            movements: {
                entries,
                exits
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el historial del producto", error: error.message });
    }
};