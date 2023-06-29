import express from "express";
import {
    deleteProduct,
    getProductById,
    getProducts,
    saveProduct,
    updateProduct
} from "../controllers/ProductController.js";
import { insertValidator } from "../middleware/validator.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', insertValidator() ,saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;