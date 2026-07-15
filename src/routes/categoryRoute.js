import express from 'express';
import { createCategory, deleteCategory, getcategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';


const route = express();

route.post("/", createCategory);
route.post("/", getcategory);
route.get("/:categoryId", getCategoryById);
route.put("/:categoryId", updateCategory);
route.delete("/:categoryId", deleteCategory);

export default route;