import express from 'express';
import { registerController,loginController,testController} from "../controllers/authcontroller.js";
import { isadmin, requireSignIn } from './../middlewares/authMiddlewares.js';
//router object
const router=express.Router();
//routing
// register|| method POST
router.post('/register',registerController)
//login|| POST
router.post('/login',loginController)
//test|| GET
router.get('/test',requireSignIn,isadmin,testController)
export default router