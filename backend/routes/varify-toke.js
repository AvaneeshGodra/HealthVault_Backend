import  express  from "express";
import { userController } from "../controllers/user-controler.js";
const verifyRoutes=express.Router();

verifyRoutes.post('/verifytoken',userController.verifytoken);

export default verifyRoutes;