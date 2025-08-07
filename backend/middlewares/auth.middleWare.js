import jwt  from "jsonwebtoken";
import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// check if the user is authenticate or not

const authenticate =asyncHandler(async(req , res, next)=>{
    //  console.log(`req ccokie token : ${req.cookies.jwt}`)
    // read the JWT from the 'jwt' cookie
const token=req.cookies.jwt;
    //   console.log(`Token :${token}`);
    if(token){
       
        try{
            const decoded=jwt.verify(token,process.env.JWT_TOKEN_SECRET);

            req.user=await User.findById(decoded.userId).select("-password");
            next();
        }catch(error){
           res.status(401);
           throw new Error("Not authorized , token failed");
        }

    }else{
        res.status(401);
        throw new Error ("Not  authorized , no token");
    }

});

const authorizedAdmin =(req,res,next)=>{
        // console.log(` User as admin${req.user}`);
    if(req.user && req.user.isAdmin){
        // console.log("yes user is admin");
        next();
    }else{
        res.status(401).send("Not authorized as an admin");
    }
};

export {authenticate ,authorizedAdmin};
