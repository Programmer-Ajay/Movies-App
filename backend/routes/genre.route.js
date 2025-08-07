import { Router } from "express";


// controller

import { createGenre,updateGenre,removeGenre,listGenre,readGenre } from "../controllers/genre.controller.js";
const router=Router();

// middleware
import { authenticate,authorizedAdmin } from "../middlewares/auth.middleWare.js";

router.route("/genres").get(listGenre);

router.route("/").post(authenticate,authorizedAdmin,createGenre);


// chaining of route

router.route("/:id").put(authenticate,authorizedAdmin,updateGenre)

router.route("/:id").delete(authenticate,authorizedAdmin,removeGenre)

router.route("/:id").post(readGenre);


// router.route("/:id").delete(authenticate,authorizedAdmin,removeGenre);





export default router;