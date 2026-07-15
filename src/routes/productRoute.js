import express from 'express';
import { createProduct, getProduct, getProductByCetagory, productById } from '../controllers/productControllers.js';
import { validation } from '../middlewares/validationMiddleware.js';
import productSchema from '../validators/productValidators.js';
import { authorize } from '../middlewares/productMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const route = express.Router();

route.use(express.json());

route.get("/", getProduct);
route.post("/add",authMiddleware,authorize("admin"), createProduct);
route.delete("/delete",(req,res)=>{});
route.put("/update",(req,res)=>{});
route.get("/category/:categoryId",getProductByCetagory);
route.get("/:productId",productById);

export default route;