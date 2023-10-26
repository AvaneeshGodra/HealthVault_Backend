import  express  from "express";
import { orgController } from "../controllers/org-controler.js";
const orgRoutes=express.Router();

orgRoutes.post('/orglogin',orgController.login);
orgRoutes.post('/usercard',orgController.fetch);
orgRoutes.post('/addconsultation',orgController.addconsult);
orgRoutes.post('/displayconsultataion',orgController.displayconsult);
orgRoutes.post('/aimodel',orgController.aimodel);
export default orgRoutes;