import MovementEntry  from './movementEntry.model.js';
import MovementExit from './movementExit.model.js';
import Product from '../product/product.model.js';
import Client from '../client/client.model.js';
import jwt from 'jsonwebtoken';


export const registerEntry = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: userId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

        const { nameProduct, quantity } = req.body;

        const product = await Product.findOne({ nameProduct }).populate('supplier', 'nameSupplier');

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado con ese nombre" });
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

export const ListEntries = async (req, res) => {
    try {
        const entries = await MovementEntry.find()
            .populate('product', 'nameProduct')
            .populate('employee', 'name surname')
            .sort({ date: -1 });

        const formattedEntries = entries.map(entry => ({
            date: entry.date,
            quantity: entry.quantity,
            motive: entry.motive,
            productName: entry.product?.nameProduct || 'Producto no encontrado',
            employee: {
                name: entry.employee?.name || 'Desconocido',
                surname: entry.employee?.surname || ''
            }
        }));

        res.status(200).json({
            message: "Historial completo de entradas",
            entries: formattedEntries
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener entradas", error: error.message });
    }
};

export const registerExit = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { uid: employeeId } = jwt.verify(token.replace("Bearer ", ""), process.env.SECRETORPRIVATEKEY);

        const { nameProduct, quantity, motive, destination, emailClient } = req.body;

        const product = await Product.findOne({ nameProduct });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado con ese nombre" });
        }

        const client = await Client.findOne({ emailClient }).select("nameClient");
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado con ese correo" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente para realizar la salida" });
        }

        product.stock -= quantity;
        product.sales += quantity;
        await product.save();

        const movementExit = new MovementExit({
            product: product._id,
            client: client._id,
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
                clientName: client.nameClient,
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

export const ListExit = async (req, res) => {
    try {
        const exits = await MovementExit.find()
            .populate('product', 'nameProduct')
            .populate('employee', 'name surname')
            .populate('client', 'nameClient')
            .sort({ date: -1 });

        const formattedExits = exits.map(exit => ({
            date: exit.date,
            quantity: exit.quantity,
            motive: exit.motive,
            destination: exit.destination,
            productName: exit.product?.nameProduct || 'Producto no encontrado',
            clientName: exit.client?.nameClient || 'Cliente no encontrado',
            employee: {
                name: exit.employee?.name || 'Desconocido',
                surname: exit.employee?.surname || ''
            }
        }));

        res.status(200).json({
            message: "Historial completo de salidas",
            exits: formattedExits
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener salidas", error: error.message });
    }
};