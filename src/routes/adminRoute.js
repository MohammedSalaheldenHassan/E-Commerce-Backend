/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test API
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: Working
 */
import express from 'express';
import { deleteUser, getAllUsers, getDashboardStats, getUserById, updateUserRole } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const route = express();

route.get("/dashboard",authMiddleware, getDashboardStats);
route.get("/users/:userId",authMiddleware, getUserById);
route.get("/users",authMiddleware, getAllUsers);
route.put("/users/:userId/userRole",authMiddleware, updateUserRole);
route.delete("/users/:userId",authMiddleware, deleteUser);

export default route;