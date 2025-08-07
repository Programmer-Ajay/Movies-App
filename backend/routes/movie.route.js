import { Router } from "express";
import multer from "multer";
// controller
import { 
    createMovie,
    getAllMovies,
    getSpecificMovie,
    updateMovie,
    movieReview,
    deleteMovie,
    deleteComment,
    getNewMovies,
    getTopRatedMovies,
    getRandomMovies
    
    } from "../controllers/movie.controller.js";

    // const upload=multer();
const router=Router();

// middleware
import { authenticate,authorizedAdmin } from "../middlewares/auth.middleWare.js";

import checkId from "../middlewares/checkId.middleWare.js";

//public Routes
router.route("/all-movies").get(getAllMovies);

router.route("/specific-movies/:id").get(getSpecificMovie)

router.route("/new-movies").get(getNewMovies);

router.route("/top-movies").get(getTopRatedMovies);

router.route("/random-movies").get(getRandomMovies);


// restricted routes
router.route("/:id/reviews").post(authenticate,checkId,movieReview)


//Admin
 router.route("/create-movie").post(authenticate,authorizedAdmin,createMovie);

 router.route("/update-movie/:id").put(authenticate,authorizedAdmin,updateMovie);

 router.route("/delete-movie/:id").delete(authenticate,authorizedAdmin,deleteMovie)

 router.route("/delete-comment").delete(authenticate,authorizedAdmin,deleteComment)
export default router;