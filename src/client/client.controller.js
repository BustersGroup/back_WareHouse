'use strict'

import Client from './client.model.js';

export const addClient = async (req, res) => {
    try {
        const data = req.body;
        const client = new Client(data);
        await client.save();
        res.status(201).json({
            success: true,
            message: "Client created successfully",
            client
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating client",
            error: error.message
        })
    }
}
export const getClients = async (req, res) => {
    try {
        const clients = await Client.find()
        res.status(200).json({
            success: true,
            message: "Clients fetched successfully",
            total: clients.length,
            clients
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching clients",
            error: error.message
        })
    }
}

export const getClientbyName = async (req, res) => {
    try {
        const { nameClient } = req.params;
        const client = await Client.findOne({nameClient});
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Client fetched successfully",
            client
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching client",
            error: error.message
        })
    }  
}

export const updateClient = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const client = await Client.findByIdAndUpdate(id, data, {new: true});
        
        res.status(200).json({
            success: true,
            message: "Client updated successfully",
            client
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating client",
            error: error.message
        })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Client deleted successfully",
            client
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting client",
            error: error.message
        })
    }
}