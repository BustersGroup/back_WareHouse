import { Router } from "express";
import { addClient, getClientbyName, getClients, updateClient, deleteClient } from "./client.controller.js";
import { createClientValidator, getClientsValidator, updateClientValidator, deleteClientValidator } from "../middlewares/client-validators.js";

const router = Router();

router.post("/registerClient", createClientValidator, addClient)
router.get("/clients", getClientsValidator, getClients)
router.get("/findClient/:nameClient", getClientsValidator, getClientbyName)
router.put("/updateClient/:id", updateClientValidator, updateClient)
router.delete("/deleteClient/:id", deleteClientValidator, deleteClient)

export default router;