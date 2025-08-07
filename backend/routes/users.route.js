import { Router } from "express";


// controller
import  {
         createUser,
         loginUser,
         logoutUser,
          getAllUsers,
          getCurrentUserProfile,
          updatecurrentUserProfile
 }from "../controllers/user.controller.js";



// middleware
import { authenticate,authorizedAdmin } from "../middlewares/auth.middleWare.js";


const router=Router();

router.route("/").post(createUser).get(authenticate,authorizedAdmin , getAllUsers);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/profile").get(authenticate,getCurrentUserProfile).put(authenticate,updatecurrentUserProfile)


export default router;
