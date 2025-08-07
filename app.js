import cookieParser from "cookie-parser";
import express from "express";
import  cors from 'cors'
import path from 'path'

// create express app
const app=express();

// middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:'20kb'
}));
// if the data is come from the url 
app.use(express.urlencoded({
    extended:true,
    limit:'20kb'
}))

app.use(cookieParser());

// route import
 import userRouter from './backend/routes/users.route.js'

 import genreRouter from './backend/routes/genre.route.js'
 import movieRouter from './backend/routes/movie.route.js';
 import uploadRouter from './backend/routes/upload.route.js'

//  route declaration
app.use('/api/v1/users',userRouter);
app.use('/api/v1/genre',genreRouter);
app.use('/api/v1/movies',movieRouter);

app.use('/api/v1/upload',uploadRouter)

const __dirname= path.resolve();
app.use("/uploads",express.static(path.join(__dirname + "/uploads")))


/*
__dirname is a special variable in Node.js that holds the absolute path of the current file’s directory.

path.resolve():
This is a method from Node.js’s path module that gives you the absolute path of the current working directory (similar to process.cwd()).

*/

export {app};


/*

 3. app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
✅ What it does:
This tells Express to serve static files (like images, PDFs, etc.) from the /uploads folder.

🔍 Breaking it down:
app.use("/uploads", ...):
This means if someone visits http://localhost:PORT/uploads/filename.jpg, Express will look for filename.jpg in your /uploads directory.

express.static(...):
This is a built-in middleware function to serve static files (like HTML, images, files).

path.join(__dirname + "/uploads"):
This joins your absolute root directory with the folder name "uploads", giving you the full path to the uploads folder (e.g., /home/ajay/project/uploads).

*/