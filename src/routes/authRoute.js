import express from 'express';
import { createAccount, login, logout } from '../controllers/authController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import  {  registerValidation } from '../validators/authValidators.js';


const route = express();

route.post("/register" ,createAccount);

route.post("/login",  login);

route.post("/logout",  logout);

export default route;