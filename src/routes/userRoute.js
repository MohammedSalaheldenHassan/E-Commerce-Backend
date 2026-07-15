import express from 'express';
import { createAccount, login, logout } from '../controllers/authController.js';
import { validation } from '../middlewares/validationMiddleware.js';
import  {  registerValidation } from '../validators/authValidators.js';
import { changePassword, deleteProfile, getProfile, updateProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const route = express();

route.get("/",authMiddleware,getProfile);
route.put("/update-profile",authMiddleware,updateProfile);
route.delete("/delete-profile",authMiddleware,deleteProfile);
route.put("/change-password",authMiddleware,changePassword);

export default route;