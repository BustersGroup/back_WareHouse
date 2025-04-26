import { Router } from "express";
import { uploadProductImage } from "../middlewares/multer-uploads.js";
import { createdProductValidator, getProductByNameValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validators.js";
import { addProduct, getProducts, getProductbyName, getProductbyCategory, getProductbyEntryDate, updateProduct, deleteProduct } from "./product.controller.js";

const router = Router();

router.post("/registerProduct", uploadProductImage.single("imageProduct"), createdProductValidator, addProduct)
router.get("/products", getProducts)
router.get("/findProduct/:nameProduct", getProductByNameValidator, getProductbyName)
router.get("/category/:category", getProductbyCategory)
router.get("/entryDate/:entryDate", getProductbyEntryDate)
router.put("/updateProduct/:uid", updateProductValidator, updateProduct)
router.delete("/deleteProduct/:uid", deleteProductValidator, deleteProduct)

export default router