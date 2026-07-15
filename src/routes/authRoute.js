import express from 'express';
import { createAccount, login, logout } from '../controllers/authController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import  {  registerValidation } from '../validators/authValidators.js';


const route = express();

route.post("/register" ,createAccount);

route.post("/login",  login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
route.post("/logout",  logout);

export default route;