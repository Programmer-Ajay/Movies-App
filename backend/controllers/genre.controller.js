import { isValidObjectId } from "mongoose";
import Genre from "../models/genre.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create the genre
 const createGenre = asyncHandler(async(req,res)=>{
   
    try{
 const {name}= req.body;
 if(!name){
    return res.json({error:"Name is required"});
 }

 const existingGenre = await Genre.findOne({name});
 if(existingGenre){
    return res.json({error:"Already exists"});
 }
 const genre =await Genre({name}).save();
 return  res.status(201).json({genre,message:"genre is created successfully"});  


    }catch(error){
        console.log("genre errr",error);
    }

 })

// update the genre
const updateGenre=asyncHandler(async(req, res)=>{
const {name}=req.body;
      
    try{
      const {name}=req.body;
      const {id}=req.params;
       if(!isValidObjectId(id)){
            return res.status(400).json({error:"NOT VALID OBJECT ID"});

        }
        
      const genre = await Genre.findById(id);
      if(!genre){
        return res.status(400).json({error:"genre not found"});
      }
      genre.name=name;
      const updatedGenre = await genre.save();
      res.json(updatedGenre);
       

    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"});
    }

})


const removeGenre =asyncHandler(async(req,res)=>{
  
    try {
        const {id}= req.params;
         if(!isValidObjectId(id)){
            return res.status(400).json({error:"NOT VALID OBJECT ID"});
        }
        const removedGenre = await Genre.findByIdAndDelete(id);

        if(!removedGenre){
            return res.status(404).json({error:"Genre not found"});
        }

        res.json(removedGenre);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
})


const listGenre =asyncHandler(async(req,res)=>{
console.log("🎯 Hitting /api/v1/genre/genres");
    try{
        console.log("🎯 Hitting /api/v1/genre/genres");
        const allGenre = await Genre.find({});
        console.log("ALL genre",allGenre);
        res.json(allGenre);

    }catch(error){
        console.log("All genre list error",error);
        return res.status(400).json(error.message);
    }
})


const readGenre = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        if(!isValidObjectId(id)){
            return res.status(400).json({error:"NOT VALID OBJECT ID"});
        }
     const genre =await Genre.findById(id);
     res.json(genre);

    }catch(error){
      console.log("read error controller",error);
    return res.status(400).json(error.message);
    }
})
 export {
    createGenre,
    updateGenre,
    removeGenre,
    listGenre,
    readGenre
 }