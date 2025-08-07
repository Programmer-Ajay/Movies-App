// this is our main index file

import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "../app.js"

dotenv.config({
    path: './.env'
})

// database connection

// connect db is a asychronous function
connectDB().then(()=>{

    // if the connection is failed
    
    app.on('error',(error)=>{
         console.log("Error:",error);
          throw error;

    })
     app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at the port ${process.env.PORT}`)
     })
}).catch((error)=>{
     console.log("MongoDB connection is failed !!!", error);
})