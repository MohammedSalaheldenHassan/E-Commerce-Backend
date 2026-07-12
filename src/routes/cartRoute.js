import express from 'express';
import { addToCart, cleanCart, getCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const cartRoute = express.Router();

cartRoute.use(express.json());

cartRoute.post("/add", authMiddleware, addToCart);

// Get logged-in user's cart
cartRoute.get("/", authMiddleware, getCart);

// Update quantity of a cart item
cartRoute.put("/item/:cartItemId", authMiddleware, updateCartItem);

// Remove one item from cart
cartRoute.delete("/item/:cartItemId", authMiddleware, removeCartItem);

// Clear all items from cart
cartRoute.delete("/clear", authMiddleware, cleanCart);

export default cartRoute;