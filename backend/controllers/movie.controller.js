import Movie from "../models/movies.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// redefine this all component

const createMovie = async(req,res)=>{
    try{
        const newMovie=new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json({savedMovie, message:"movie created successfully"});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


//get all movie controller
/* either you use async with try catch block or use async handler  both works same in above method we use the async function directly */

    
const getAllMovies=asyncHandler(async(req,res)=>{
  
  const movies=  await Movie.find({});
  if(!movies){
    return  res.status(404).json({error:"movies not found"});

  }
  res.status(200).json(movies
  ); 
})


// const getAllMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


//get a specific movie

const getSpecificMovie= async(req,res)=>{
try {
    const{id}=req.params;
    const specificMovie=await Movie.findById(id);
    if(!specificMovie){
      return res.status(404).json({ message: "Movie not found" } );


    }
    res.status(200).json(specificMovie);
} catch (error) {   
}
};

const updateMovie=async(req,res)=>{
try{
       const{id}=req.params;
       console.log("request body data:",req.body)
       const updatedMovie=await Movie.findByIdAndUpdate(id,req.body,{new:true})
       console.log("Updated Movie:",updatedMovie)
       // new:true means return a new document updated document
       if(!updatedMovie){
        return res.status(404).json({error:"Movie not found"});
       }
       res.status(200).json(updatedMovie);
}catch(error){
    console.log(error);
    return res.status(500).json({error:error.message});
}

}

const deleteMovie=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedMovie=await Movie.findByIdAndDelete(id);
        if(!deletedMovie){
            return res.status(404).json({error:"movie not found"});

        }
        return res.status(200).json({message:"Movie deleted Successfully"});
    } catch
     (error) {
        console.log(error);
    return res.status(500).json({error:error.message});
    }
}

const movieReview=async(req,res)=>{
try {
    
    const {rating,comment}=req.body;
    const movie=await Movie.findById(req.params.id);
    if(movie){
        const alreadyReview=movie.reviews.find((r)=>r.user.toString()===req.user._id.toString());
        console.log("authneticate user",req.user._id);

        if(alreadyReview){
        res.status(400);
        throw new Error("movie already reviewed by you");
        }

        const review={
       name:req.user.username,
       rating:Number(rating),
       comment,
       user:req.user._id
        }

        movie.reviews.push(review);
        movie.numReviews=movie.reviews.length;

        movie.rating=
                    movie.reviews.reduce((acc,item)=>item.rating+acc,0)/movie.reviews.length;

                    await movie.save();
                    res.status(201).json({message:"Review added"})
    }else{
        res.status(404);
        throw new Error("movie not found");
    }
} catch (error) {
  console.log(error);
  res.status(400).json(error.message);  
}
}

const deleteComment=async(req,res)=>{

    try{
    
const {movieId,reviewId}=req.body;
const movie=await Movie.findById(movieId);
if(!movie){
    return res.status(404).json({message:"movie not found"});

}
const reviewIndex = movie.reviews.findIndex((r)=>r._id.toString()===reviewId);

if(reviewIndex===-1){
    return res.status(404).json({message:"comment not found"});
}

movie.reviews.splice(reviewIndex,1);
movie.numReviews=movie.reviews.length;
movie.rating=movie.reviews.length>0?movie.reviews.reduce((acc,item)=>item.rating+acc,0)/movie.reviews.length:0;

await movie.save();

res.status(200).json({message:"comment deleted successfully"});

    }catch(error){
    console.error(error);
    res.status(500).json({ error: error.message });
    }


}


const getNewMovies =async(req,res)=>{
   try {
    const newMovies=await Movie.find().sort({createdAt:-1}).limit(10);
    console.log("New Movies:",newMovies)
    res.json(newMovies)

   } catch (error) {
     console.error(error);
    res.status(500).json({ error: error.message });
   }
}

const getTopRatedMovies=async(req,res)=>{
    try{
        const topRatedMovies=await Movie.find().sort({numReviews:-1}).limit(10);
        res.status(200).json(topRatedMovies);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

 const getRandomMovies= async(req,res)=>{
    try {
        const randomMovies=await Movie.aggregate([{$sample:{size:10}}])
        console.log("random Movies:",randomMovies)
        res.status(200).json(randomMovies)
    } catch (
       error 
    ) {
        console.log("random movie Error:",error);
       res.status(500).json({error:error.message});  
    }
}

export {
    createMovie,
    getAllMovies,
    getSpecificMovie,
    updateMovie,
    deleteMovie,
    movieReview,
    deleteComment,
    getNewMovies,
    getTopRatedMovies,
    getRandomMovies,
};

