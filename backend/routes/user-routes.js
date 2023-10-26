import  express  from "express";
import { userController } from "../controllers/user-controler.js";
const userRoutes=express.Router();

userRoutes.post('/usersignup',userController.register);
userRoutes.post('/userlogin',userController.login);

export default userRoutes;