import express from 'express';
import { cancelOrder, createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const route = express();
route.post("/", authMiddleware, createOrder);
route.get("/my-orders", authMiddleware, getMyOrders);
route.get("/:orderId", authMiddleware, getOrderById);
route.put("/cancel/:orderId", authMiddleware, cancelOrder);




export default route;