import express from 'express';
import { addToCart, cleanCart, getCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const route = express.Router();

route.use(express.json());

route.post("/add", authMiddleware, addToCart);

// Get logged-in user's cart
route.get("/", authMiddleware, getCart);

// Update quantity of a cart item
route.put("/item/:cartItemId", authMiddleware, updateCartItem);

// Remove one item from cart
route.delete("/item/:cartItemId", authMiddleware, removeCartItem);

// Clear all items from cart
route.delete("/clear", authMiddleware, cleanCart);

export default route;