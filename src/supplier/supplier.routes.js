import { Router } from "express";
import { createSupplierValidator, getSupplierByNameValidator, updateSupplierValidator, deleteSupplierValidator } from "../middlewares/supplier-validators.js";
import { createSupplier, getSuppliers, getSupplierById, getSupplierByName, updateSupplier, deleteSupplier } from "../supplier/supplier.controller.js";

const router = Router();

router.post("/register", createSupplierValidator, createSupplier);

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

router.get("/find/:nameSupplier", getSupplierByNameValidator, getSupplierByName);

router.put("/updateSupplier/:id", updateSupplierValidator, updateSupplier);

router.delete("/deleteSupplier/:id", deleteSupplierValidator, deleteSupplier);

export default router;