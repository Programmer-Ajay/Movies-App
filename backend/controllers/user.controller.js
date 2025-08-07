import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/users.model.js";
import generateToken from "../utils/createToken.js";


// Registering the User
const createUser=asyncHandler(async(req , res )=>{
const {username,email,password}=req.body;

if(!username ||!email ||!password){
    throw new Error ("please fill all the fields");
}

// now check if the user already exit or not
const existedUser=await User.findOne({email});

if(existedUser) res.status(400).send("User already exists");

// hash your password;
const salt= await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

// method-1
  // entry in the DB
// const newUser= new User({username,email,password:hashedPassword});

// // saving the new entries
// try {
//     await newUser.save();
//     generateToken(res,newUser._id);
//     res.status(201).json({
//         _id:newUser._id,
//         username:newUser.username,
//         email:newUser.email,
//         isAdmin:newUser.isAdmin,
//     });
// } catch (error) {
//     res.status(400);
//     throw new Error("Invalid user data");
// }


//method-2
const user= await User.create({
    username,
    email,
    password:hashedPassword
})
// now if the user is created then find it by id
const createdUser=await User.findById(user._id).select("-password")

if(!createdUser){
    throw new Error("something went wrong while registering");
}
generateToken(res,user._id);

res.status(201).json({
        _id:createdUser._id,
        username:createdUser.username,
        email:createdUser.email,
        isAdmin:createdUser.isAdmin,

})
 
})

const loginUser =asyncHandler(async(req,res)=>{
 const {email , password}=req.body;
 
 const existingUser =await User.findOne({email});
 if(existingUser){
    const isPasswordValid = await bcrypt.compare(password,existingUser.password);
 

 if(isPasswordValid){
    generateToken(res,existingUser._id);
 
 res.status(201).json({
    _id:existingUser._id,
    username:existingUser.username,
    email:existingUser.email,
    isAdmin:existingUser.isAdmin,
    message:"login successfully "


 })
    }else{
        res.status(401).json({message:"Invalid Password"});
    }

}
else{
     res.status(401).json({ message:"User is not found"});
}

})

const logoutUser=asyncHandler(async(req,res,next)=>{

    // to logout simlpy clear the token via which in the cookie here we do the same thing
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
    })

    res.status(200).json({message:"Logged Out successfully"});

})

const getAllUsers=asyncHandler(async(req,res)=>{
   
    const users= await User.find({});  // empty object find the 
    //  console.log("Authorized admin users:",users);
    res.status(200).json(users);
})

const getCurrentUserProfile =asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){

        res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
        })
    }else{
        res.status(404);
        throw new Error ("User not found");
    }

})

const updatecurrentUserProfile =asyncHandler(async(req,res)=>{
    
    const user = await User.findById(req.user._id);
    const {username,email,password}=req.body;
    //    console.log("Updated wala user:",user)
    //    console.log(`Updating info of user:"${username} ${email} ${password}`);
  
    if(user){
        user.username = username;
        user.email = email;

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password,salt);

            user.password =hashedPassword;
        }
        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
         res.status(404);
         throw new Error("User not found");
    }
})



export { createUser,
         loginUser,
         logoutUser,
          getAllUsers,
          getCurrentUserProfile,
          updatecurrentUserProfile
}